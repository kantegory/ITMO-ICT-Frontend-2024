document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращает обновление страницы

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value;

            if (!username || !email || !password || !confirmPassword) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            if (!validateEmail(email)) {
                alert('Введите корректный адрес электронной почты!');
                return;
            }

            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }

            const existingUser = localStorage.getItem(email);
            if (existingUser) {
                alert('Пользователь с таким email уже зарегистрирован!');
                return;
            }

            const userData = {
                username: username,
                email: email,
                password: password
            };

            localStorage.setItem(email, JSON.stringify(userData));

            alert('Регистрация успешно завершена!');
            window.location.href = 'login.html';
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});