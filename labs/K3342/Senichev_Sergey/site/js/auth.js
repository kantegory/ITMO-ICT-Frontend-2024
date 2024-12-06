document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.auth-form');

    async function login(email, password) {
        try {
            const response = await fetch(`http://localhost:3000/users?email=${email}`);
            const users = await response.json();

            if (users.length === 0) {
                throw new Error('Пользователь не найден');
            }

            const user = users[0];
            if (user.password !== password) {
                throw new Error('Неверный пароль');
            }

            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                level: user.level,
                image: user.image
            }));

            if (typeof updateHeaderUI === 'function') {
                updateHeaderUI();
            }

            window.location.href = '../pages/profile.html';
        } catch (error) {
            alert(error.message);
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            await login(email, password);
        });
    }
});