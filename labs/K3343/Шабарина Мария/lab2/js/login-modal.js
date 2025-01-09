document.getElementById('openLoginModal').addEventListener('click', function() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
});

document.querySelector('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    await loginUser(email, password);
});

async function loginUser(email, password) {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                localStorage.setItem('userId', user.id);
                alert('Login successful');
                window.location.href = "account.html";
            } else {
                alert('Login failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
