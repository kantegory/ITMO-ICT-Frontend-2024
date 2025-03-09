// This file handles the registration form functionality, including form validation and submission.

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = registerForm.name.value.trim();
        const email = registerForm.email.value.trim();
        const password = registerForm.password.value;
        const confirmPassword = registerForm.confirmPassword.value;
        const fitnessLevel = registerForm.fitnessLevel.value;

        if (validateForm(name, email, password, confirmPassword)) {
            // Simulate a successful registration (replace with actual API call)
            console.log('Registration successful:', {
                name,
                email,
                password,
                fitnessLevel
            });
            alert('Registration successful! You can now log in.');
            registerForm.reset();
        }
    });

    function validateForm(name, email, password, confirmPassword) {
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            alert('Please fill in all fields.');
            return false;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return false;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return false;
        }
        return true;
    }
});