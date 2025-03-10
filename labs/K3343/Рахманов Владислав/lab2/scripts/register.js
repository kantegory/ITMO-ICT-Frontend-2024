// register.js
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios.post('http://localhost:3000/users', {
        username: username,
        email: email,
        password: password
    })
    .then(response => {
        alert('Регистрация выполнена успешно!');
    })
    .catch(error => {
        console.error('Произошла ошибка при регистрации!', error);
    });
});
