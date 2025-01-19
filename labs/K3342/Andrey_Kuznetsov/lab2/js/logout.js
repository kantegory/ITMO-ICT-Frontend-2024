const logoutButton = document.querySelector(".logout");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("isAuthenticated");
        window.location.href = '../html/auth.html'; 
    });
}
