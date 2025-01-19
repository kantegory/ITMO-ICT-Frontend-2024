document.addEventListener("DOMContentLoaded", function () {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
        window.location.href = '../html/auth.html';
    }

    const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem("isAuthenticated");
            window.location.href = '../html/auth.html';
        });
    }
});