document.getElementById('registration-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const messageBox = document.getElementById('message');

    messageBox.innerHTML = "";

    if (password !== confirmPassword) {
        messageBox.innerHTML = '<div class="alert alert-danger">Пароли не совпадают!</div>';
        return;
    }

    const registrationDate = new Date().toISOString();

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, registrationDate })
        });

        if (response.ok) {
            messageBox.innerHTML = '<div class="alert alert-success">Регистрация прошла успешно!</div>';

            localStorage.setItem('currentUsername', username);

            setTimeout(() => {
                window.location.href = 'main_page.html';
            }, 2000);
        } else {
            throw new Error('Ошибка при регистрации');
        }
    } catch (error) {
        console.error(error);
        messageBox.innerHTML = '<div class="alert alert-danger">Не удалось зарегистрироваться. Попробуйте позже.</div>';
    }
});