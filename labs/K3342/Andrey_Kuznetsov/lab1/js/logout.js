document.getElementsByClassName("logout").addEventListener("click", function () {
    localStorage.removeItem("isAuthenticated"); 
    window.location.href = '../html/auth.html'; 
});