const formContainer = document.querySelector('.form-container');
const loginLink = document.getElementById('login');
const signupLink = document.getElementById('signup');

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.add('active');
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.remove('active');
});

document.querySelector('.login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    localStorage.setItem("isAuthenticated", "true");

    window.location.href = '../html/profile.html';
});
