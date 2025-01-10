document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    document.getElementById('dob').setAttribute('max', maxDate);
});

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const dob = document.getElementById('dob').value;

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Пожалуйста, введите корректный email.");
            return;
        }

        // Validate phone number format (10 digits)
        if (!/^\d{10}$/.test(phone)) {
            alert("Пожалуйста, введите корректный номер телефона (10 цифр).");
            return;
        }

        // Validate password length
        if (password.length < 8) {
            alert("Пароль должен быть не менее 8 символов.");
            return;
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            alert("Пароли не совпадают.");
            return;
        }

        console.log('Sending registration request...'); // Debug log

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                password,
                dob
            })
        });

        console.log('Response received:', response.status); // Debug log

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Server error');
        }

        const data = await response.json();
        console.log('Registration successful:', data); // Debug log

        if (data.success) {
            localStorage.setItem('loggedInUserId', data.id);
            localStorage.setItem('accessToken', data.accessToken);
            window.location.href = 'user.html';
        } else {
            alert('Ошибка регистрации: ' + data.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Произошла ошибка при регистрации: ' + (error.message || 'Пожалуйста, попробуйте снова.'));
    }
});