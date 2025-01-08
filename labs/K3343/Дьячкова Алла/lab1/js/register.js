document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
    document.getElementById('dob').setAttribute('max', maxDate);
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Пожалуйста, введите корректный email.");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Пожалуйста, введите корректный номер телефона (10 цифр).");
        return;
    }

    if (password.length < 8) {
        alert("Пароль должен содержать не менее 8 символов.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Пароли не совпадают.");
        return;
    }

    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('password', password);
    localStorage.setItem('dob', dob);

    window.location.href = 'user.html';
});