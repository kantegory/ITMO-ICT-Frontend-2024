document.addEventListener('DOMContentLoaded', fillUserInfo);

function fillUserInfo() {
    document.getElementById('firstName').textContent = localStorage.getItem('firstName') || 'Не указано';
    document.getElementById('lastName').textContent = localStorage.getItem('lastName') || 'Не указано';
    document.getElementById('dob').textContent = localStorage.getItem('dob') || 'Не указано';
    document.getElementById('phone').textContent = localStorage.getItem('phone') || 'Не указано';
    document.getElementById('email').textContent = localStorage.getItem('email') || 'Не указано';
}

function editUserInfo() {
    // Display edit section and populate with current values
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('editInfo').style.display = 'block';
    document.getElementById('changePassword').style.display = 'none';

    // Populate edit form fields with localStorage data
    document.getElementById('editFirstName').value = localStorage.getItem('firstName') || '';
    document.getElementById('editLastName').value = localStorage.getItem('lastName') || '';
    document.getElementById('editDob').value = localStorage.getItem('dob') || '';
    document.getElementById('editPhone').value = localStorage.getItem('phone') || '';
    document.getElementById('editEmail').value = localStorage.getItem('email') || '';
}

// function changePassword() {
//     document.getElementById('userInfo').style.display = 'none';
//     document.getElementById('changePassword').style.display = 'block';
//     document.getElementById('editInfo').style.display = 'none';
// }

function cancelEdit() {
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('editInfo').style.display = 'none';
    document.getElementById('changePassword').style.display = 'none';
}

function validateUserInfo() {
    // Validate and save edited information
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

    // Save data to localStorage
    localStorage.setItem('firstName', document.getElementById('editFirstName').value);
    localStorage.setItem('lastName', document.getElementById('editLastName').value);
    localStorage.setItem('dob', document.getElementById('editDob').value);
    localStorage.setItem('phone', phone);
    localStorage.setItem('email', email);

    // Update static display
    fillUserInfo();
    alert('Информация успешно обновлена');
    cancelEdit();
    return false; // Prevents form submission reloading the page
}

function validatePassword() {
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword.length < 6) {
        alert('Пароль должен быть не менее 6 символов');
        return false;
    }

    alert('Пароль успешно обновлен');
    cancelEdit();
    return false;
}

// function toggleChatHistory() {
//     const chatHistory = document.querySelector('.chat-history');
//     chatHistory.style.display = chatHistory.style.display === 'none' || chatHistory.style.display === '' ? 'block' : 'none';
// }

document.getElementById('editInfoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    validateUserInfo();
});

document.getElementById('changePasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    validatePassword();
});

function logout() {
            // Логика выхода пользователя
    window.location.href = 'logout.html'; // Замените 'logout.html' на нужный путь
}