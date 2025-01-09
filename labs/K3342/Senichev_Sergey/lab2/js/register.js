document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.auth-form');

    async function register(name, email, password, level) {
        try {
            const response = await fetch(`http://localhost:3000/users?email=${email}`);
            const users = await response.json();

            if (users.length > 0) {
                throw new Error('Пользователь с таким email уже существует');
            }

            const newUser = { name, email, password, level };
            const createResponse = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            if (!createResponse.ok) {
                throw new Error('Ошибка регистрации');
            }

            alert('Регистрация прошла успешно! Войдите в систему.');
            window.location.href = 'login.html';
        } catch (error) {
            alert(error.message);
        }
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="password"]').value;
            const confirmPassword = this.querySelector('input[name="confirmPassword"]').value;
            const level = this.querySelector('select[name="level"]').value;

            if (password !== confirmPassword) {
                alert('Пароли не совпадают');
                return;
            }

            await register(name, email, password, level);
        });
    }
});