document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращает обновление страницы

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            const userData = localStorage.getItem(email);

            if (!email || !password) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const parsedUserData = JSON.parse(userData);

            if (!validateEmail(email)) {
                alert('Введите корректный адрес электронной почты!');
                return;
            }

            if (parsedUserData.password === password) {
                alert("Вход выполнен успешно! Добро пожаловать, " + parsedUserData.username + "!");
                window.location.href = "user-dash.html";
            } else {
                alert("Неверный email или пароль. Попробуйте снова.");
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});