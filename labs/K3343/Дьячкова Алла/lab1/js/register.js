document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
    document.getElementById('dob').setAttribute('max', maxDate);
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    // Validate phone number format (10 digits)
    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid phone number (10 digits).");
        return;
    }

    // Validate password length
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const registrationData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,  // Send plaintext password
        dob: dob
    };

    fetch('http://localhost:3000/register', { // Make sure this URL matches the server endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            // User registered successfully
            localStorage.setItem('loggedInUserId', data.id);
            window.location.href = 'user.html';  // Redirect to user dashboard or home page
        } else {
            alert('Registration error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Registration error:', error);
        alert('An error occurred during registration. Please try again.');
    });
});
