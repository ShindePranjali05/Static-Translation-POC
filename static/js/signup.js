document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const preferredLanguage = document.getElementById("preferredLanguage").value;
    const messageBox = document.getElementById("signupMessage");

    messageBox.className = "form-message";
    messageBox.style.display = "none";
    messageBox.textContent = "";

    if (!email || !password || !confirmPassword || !preferredLanguage) {
        messageBox.textContent = "Please fill in all fields.";
        messageBox.classList.add("error");
        return;
    }

    if (password !== confirmPassword) {
        messageBox.textContent = "Passwords do not match.";
        messageBox.classList.add("error");
        return;
    }

    try {
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                preferred_language: preferredLanguage
            })
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("selectedLanguage", preferredLanguage);
            messageBox.textContent = "Account created successfully. Redirecting to login...";
            messageBox.classList.add("success");

            setTimeout(() => {
                window.location.href = "/login";
            }, 900);
        } else {
            messageBox.textContent = result.error || "Signup failed.";
            messageBox.classList.add("error");
        }
    } catch (error) {
        messageBox.textContent = "Something went wrong. Please try again.";
        messageBox.classList.add("error");
    }
});