const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'blue-theme') {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    } else {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    }
}

// Переключение темы
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('blue-theme')) {
        body.classList.remove('blue-theme');
        localStorage.setItem('theme', '');
        // Переключение иконки на солнце
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    } else {
        body.classList.add('blue-theme');
        localStorage.setItem('theme', 'blue-theme');
        // Переключение иконки на луну
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
});
