const themeToggler = document.getElementById('theme-toggler');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeToggler.textContent = savedTheme === 'dark-theme' ? 'Светлая тема' : 'Темная тема';
}

themeToggler.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', '');
        themeToggler.textContent = 'Темная тема';
    } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        themeToggler.textContent = 'Светлая тема';
    }
});