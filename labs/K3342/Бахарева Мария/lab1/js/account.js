document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName') || 'Имя не указано';
    const userEmail = localStorage.getItem('userEmail') || 'Email не указан';
    const userGender = localStorage.getItem('userGender') || 'Пол не указан';
    const userBirthdate = localStorage.getItem('userBirthdate') || 'Дата рождения не указана';
    const userPhone = localStorage.getItem('userPhone') || 'Телефон не указан';

    document.getElementById('user-name').textContent = userName;
    document.getElementById('user-gender').textContent = `Пол: ${userGender}`;
    document.getElementById('user-birthdate').textContent = `Дата рождения: ${userBirthdate}`;
    document.getElementById('user-phone').textContent = `Телефон: ${userPhone}`;
});
