document.addEventListener('DOMContentLoaded', function () {
    fillUserInfo();
});

function fillUserInfo() {
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (loggedInUserId) {
        // Fetch the user data from json-server using the user ID
        fetch(`http://localhost:3000/users/${loggedInUserId}`)
            .then(response => response.json())
            .then(userData => {
                // Display the user's information on the page
                document.getElementById('firstName').textContent = userData.firstName || 'Не указано';
                document.getElementById('lastName').textContent = userData.lastName || 'Не указано';
                document.getElementById('dob').textContent = userData.dob || 'Не указано';
                document.getElementById('phone').textContent = userData.phone || 'Не указано';
                document.getElementById('email').textContent = userData.email || 'Не указано';
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('An error occurred while fetching your data.');
            });
    } else {
        alert('No user logged in.');
    }
}

function editUserInfo() {
    // Display edit section and populate with current values
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('editInfo').style.display = 'block';
    document.getElementById('changePassword').style.display = 'none';

    // Fetch and populate the form fields with current user data
    fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('editFirstName').value = data.firstName || '';
        document.getElementById('editLastName').value = data.lastName || '';
        document.getElementById('editDob').value = data.dob || '';
        document.getElementById('editPhone').value = data.phone || '';
        document.getElementById('editEmail').value = data.email || '';
    })
    .catch(error => console.error('Error fetching user data for edit:', error));
}

function cancelEdit() {
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('editInfo').style.display = 'none';
    document.getElementById('changePassword').style.display = 'none';
}

function validateUserInfo() {
    const phone = document.getElementById('editPhone').value;
    const phonePattern = /^\+?[0-9\s\-\(\)]{10,15}$/;
    if (!phonePattern.test(phone)) {
        alert('Некорректный номер телефона');
        return false;
    }

    const email = document.getElementById('editEmail').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Некорректный формат email');
        return false;
    }

    const userData = {
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        dob: document.getElementById('editDob').value,
        phone: phone,
        email: email
    };

    // Send PUT request to update user data
    fetch('http://localhost:3000/user', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('User info updated:', data);
        fillUserInfo(); // Update UI with new data
        alert('Информация успешно обновлена');
        cancelEdit();
    })
    .catch(error => {
        console.error('Error updating user data:', error);
        alert('Ошибка обновления информации');
    });

    return false; // Prevents form submission reloading the page
}

function validatePassword() {
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword.length < 6) {
        alert('Пароль должен быть не менее 6 символов');
        return false;
    }

    // Send PUT request to update password
    fetch('http://localhost:3000/password', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword: newPassword })
    })
    .then(response => response.json())
    .then(data => {
        alert('Пароль успешно обновлен');
        cancelEdit();
    })
    .catch(error => {
        console.error('Error updating password:', error);
        alert('Ошибка обновления пароля');
    });

    return false;
}

document.getElementById('editInfoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    validateUserInfo();
});

document.getElementById('changePasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    validatePassword();
});

function logout() {
    // Logic for logging out
    fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        }
    })
    .then(response => response.json())
    .then(data => {
        localStorage.removeItem('authToken');
        window.location.href = 'logout.html'; // Redirect to logout page
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
}
