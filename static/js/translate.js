async function loadTranslations(language) {
    const response = await fetch(`/static/translations/${language}.json`);
    const translations = await response.json();

    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });

    const placeholderElements = document.querySelectorAll("[data-translate-placeholder]");
    placeholderElements.forEach(element => {
        const key = element.getAttribute("data-translate-placeholder");
        if (translations[key]) {
            element.placeholder = translations[key];
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    let language = "en";

    if (path !== "/signup") {
        language = localStorage.getItem("selectedLanguage") || "en";
    }

    loadTranslations(language);
});