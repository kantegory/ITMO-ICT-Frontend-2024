function checkAuthButtonsExist() {
    return document.querySelector('.auth-buttons') !== null;
}

function updateHeaderUI() {
    if (!checkAuthButtonsExist()) {
        setTimeout(updateHeaderUI, 100);
        return;
    }

    const authButtons = document.querySelector('.auth-buttons');
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            authButtons.innerHTML = `
                <a href="../pages/profile.html" class="btn btn-outline-light me-2">Личный кабинет</a>
                <button onclick="handleLogout()" class="btn btn-outline-light">Выход</button>
            `;
        } else {
            authButtons.innerHTML = `
                <a href="../pages/login.html" class="btn btn-outline-light me-2">Вход</a>
                <a href="../pages/register.html" class="btn btn-primary">Регистрация</a>
            `;
        }
    } catch (error) {
        localStorage.removeItem('currentUser');
        authButtons.innerHTML = `
            <a href="../pages/login.html" class="btn btn-outline-light me-2">Вход</a>
            <a href="../pages/register.html" class="btn btn-primary">Регистрация</a>
        `;
    }
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
}

window.updateHeaderUI = updateHeaderUI;
window.handleLogout = handleLogout;

document.addEventListener('DOMContentLoaded', function() {
    updateHeaderUI();
});

window.addEventListener('storage', function(e) {
    if (e.key === 'currentUser') {
        updateHeaderUI();
    }
});

updateHeaderUI();