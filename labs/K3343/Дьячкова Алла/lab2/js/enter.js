function enter(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/enter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('loggedInUserId', data.userId);

        window.location.href = 'user.html';
    })
    .catch(error => {
        console.error('Login error:', error);
        alert(error.message || 'Failed to login');
    });
}
document.getElementById('loginForm').addEventListener('submit', enter);
