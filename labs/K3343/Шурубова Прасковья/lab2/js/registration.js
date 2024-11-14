const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const user = {
        username: document.getElementById('register-username').value,
        surname: document.getElementById('register-surname').value,
        email: document.getElementById('register-email').value,
        password: document.getElementById('register-password').value,
        favorites: [],
        bookings: []
    };

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        window.location.reload();
    })
    .catch(error => {
        console.error('Ошибка регистрации:', error);
    });
});
