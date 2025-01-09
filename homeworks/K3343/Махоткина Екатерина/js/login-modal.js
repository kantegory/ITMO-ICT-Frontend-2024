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


function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

document.getElementById('openLoginModal').addEventListener('click', openLoginModal);
document.getElementById('closeLogin').addEventListener('click', closeLoginModal);
document.querySelector('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    await loginUser(email, password);
});
