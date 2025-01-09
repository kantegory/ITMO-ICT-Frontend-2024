document.addEventListener("DOMContentLoaded", function() {
    // Загрузка header.html
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            // Логика показа/скрытия пунктов меню
            const currentPage = window.location.pathname.split('/').pop();
            if (localStorage.getItem('token')) {
                document.querySelector('a[href="login.html"]').parentElement.classList.add('d-none');
                document.querySelector('a[href="registration.html"]').parentElement.classList.add('d-none');
            } else {
                document.querySelector('a[href="account.html"]').parentElement.classList.add('d-none');
            }

            // Подключение обработчика переключения темы
            const themeToggleButton = document.getElementById('theme-toggle');
            if (!themeToggleButton) {
                console.error('Кнопка переключения темы не найдена!');
                return;
            }

            const body = document.body;

            // Установка сохранённой темы
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                body.classList.add('dark-theme');
            }

            // Обработчик переключения темы
            themeToggleButton.addEventListener('click', () => {
                body.classList.toggle('dark-theme');
                const isDarkTheme = body.classList.contains('dark-theme');
                localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
            });
        });

    // Загрузка footer.html
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});
