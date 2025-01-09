document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const emailOrUsername = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageBox = document.getElementById('message');

    messageBox.innerHTML = "";

    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        const user = users.find(user =>
            (user.email === emailOrUsername || user.username === emailOrUsername) && user.password === password
        );

        if (user) {
            messageBox.innerHTML = '<div class="alert alert-success">Вы успешно вошли в аккаунт!</div>';

            localStorage.setItem('currentUserId', user.id);

            setTimeout(() => {
                window.location.href = 'main_page.html';
            }, 2000);
        } else {
            messageBox.innerHTML = '<div class="alert alert-danger">Неверное имя пользователя, email или пароль.</div>';
        }
    } catch (error) {
        console.error(error);
        messageBox.innerHTML = '<div class="alert alert-danger">Не удалось выполнить вход. Попробуйте позже.</div>';
    }
});
