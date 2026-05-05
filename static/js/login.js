document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const messageBox = document.getElementById("loginMessage");

    messageBox.className = "form-message";
    messageBox.style.display = "none";
    messageBox.textContent = "";

    if (!email || !password) {
        messageBox.textContent = "Please fill in all fields.";
        messageBox.classList.add("error");
        return;
    }

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (response.ok) {
            if (result.preferred_language) {
                localStorage.setItem("selectedLanguage", result.preferred_language);
            }

            messageBox.textContent = "Login successful. Redirecting...";
            messageBox.classList.add("success");

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 700);
        } else {
            messageBox.textContent = result.error || "Login failed.";
            messageBox.classList.add("error");
        }
    } catch (error) {
        messageBox.textContent = "Something went wrong. Please try again.";
        messageBox.classList.add("error");
    }
});