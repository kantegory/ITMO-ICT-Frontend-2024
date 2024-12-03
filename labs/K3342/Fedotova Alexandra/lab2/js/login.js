document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message'); 

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        messageDiv.textContent = '';
        messageDiv.className = '';

        if (!email || !password) {
            showMessage('Please enter both email and password.', 'text-danger');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const users = await response.json();
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                showMessage(`Welcome, ${user.name}!`, 'text-success');
                // Сохраняем информацию о пользователе в localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                // Перенаправление на страницу личного кабинета
                window.location.href = 'personal_acc.html'; 
            } else {
                showMessage('Invalid email or password.', 'text-danger');
            }
        } catch (error) {
            console.error('Error during login:', error);
            showMessage('An error occurred. Please try again later.', 'text-danger');
        }
    });
    
    function showMessage(message, className) {
        messageDiv.textContent = message;
        messageDiv.className = className; 
    }
});
