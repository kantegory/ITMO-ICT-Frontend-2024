const loginModal = document.getElementById("loginModal");
const openLoginButtons = [document.getElementById("openLoginModal1"), document.getElementById("openLoginModal2"), document.getElementById("openLoginModal3")];
const closeLoginButton = document.getElementById("closeLogin");

for (let i = 0; i < 3; i++){
    const openLoginBtn = openLoginButtons[i];
    openLoginBtn.onclick = function () {
        loginModal.style.display = "flex";
    };
}

closeLoginButton.onclick = function () {
    loginModal.style.display = "none";
};
