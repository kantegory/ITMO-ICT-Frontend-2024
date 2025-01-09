document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let formIsValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    name.classList.remove('is-invalid');
    email.classList.remove('is-invalid');
    password.classList.remove('is-invalid');
    confirmPassword.classList.remove('is-invalid');

    if (name.value.trim() === '') {
        name.classList.add('is-invalid');
        formIsValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        email.classList.add('is-invalid');
        formIsValid = false;
    }

    if (password.value.length < 6) {
        password.classList.add('is-invalid');
        formIsValid = false;
    }

    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
        formIsValid = false;
    }

    if (formIsValid) {
        localStorage.setItem('userName', name.value);
        localStorage.setItem('userEmail', email.value);
        localStorage.setItem('userPassword', password.value);
        localStorage.setItem('userGender', document.querySelector('input[name="gender"]:checked').value);
        localStorage.setItem('userBirthdate', document.getElementById('birthdate').value);
        localStorage.setItem('userPhone', document.getElementById('phone').value);

        document.getElementById('register-success').classList.remove('d-none');

        name.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';

        setTimeout(function() {
            window.location.href = 'account.html';
        }, 2000);
    }
});
