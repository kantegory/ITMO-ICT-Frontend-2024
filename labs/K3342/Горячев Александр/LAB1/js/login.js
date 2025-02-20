document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded and DOM fully loaded."); // Debugging

    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        console.error("loginForm not found!");
        return;
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Login form submitted! Redirecting...");
        window.location.href = 'dashboard.html';
    });
});