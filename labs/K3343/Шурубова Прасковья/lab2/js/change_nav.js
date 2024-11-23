document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.getElementById('nav-items');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        navItems.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="#" id="logout">Выйти</a>
            </li>
            <li class="nav-item dropdown" id="profile-nav">
                <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Личный кабинет
                </a>
                <ul class="dropdown-menu" aria-labelledby="profileDropdown">
                    <li><a class="dropdown-item" href="profile.html">Профиль</a></li>
                    <li><a class="dropdown-item" href="order-history.html">История заказов</a></li>
                    <li><a class="dropdown-item" href="favorites.html">Избранное</a></li>
                </ul>
            </li>
        `;
    } else {
        navItems.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="#registration" data-bs-toggle="modal">Регистрация</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#login" data-bs-toggle="modal">Вход</a>
            </li>
        `;
    }

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    }
});
