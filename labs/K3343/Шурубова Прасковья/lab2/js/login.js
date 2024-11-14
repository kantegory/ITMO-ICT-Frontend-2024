const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch(`http://localhost:3000/users?username=${username}&password=${password}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                localStorage.setItem('currentUser', JSON.stringify(data[0]));
                window.location.reload();
            } else {
                console.error('Неверный логин или пароль');
            }
        })
        .catch(error => console.error('Ошибка входа:', error));
});
