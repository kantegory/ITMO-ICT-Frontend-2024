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
                <a href="../pages/profile.html" class="btn btn-outline-light me-2">
                    <svg class="icon" aria-hidden="true" focusable="false">
                        <use href="#icon-profile"/>
                    </svg>
                    Личный кабинет
                </a>
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

function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) {
        console.error('Theme toggle button not found. Retrying...');
        setTimeout(initThemeToggle, 100);
        return;
    }

    console.log('Theme toggle button found.')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        toggle.setAttribute('aria-checked', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Инициализация при загрузке
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = prefersDark.matches;
    const isDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    setTheme(isDark);

    // Обработчик клика
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme !== 'dark');
    });

    // Обработчик системной темы
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    });
}

window.updateHeaderUI = updateHeaderUI;
window.handleLogout = handleLogout;

window.addEventListener('storage', function(e) {
    if (e.key === 'currentUser') {
        updateHeaderUI();
    }
});

updateHeaderUI();
document.addEventListener('DOMContentLoaded', initThemeToggle);