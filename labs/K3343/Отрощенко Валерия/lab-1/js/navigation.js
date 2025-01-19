document.addEventListener('DOMContentLoaded', () => {
    console.log('Навигация загружена!');

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log(`Вы выбрали страницу: ${link.textContent}`);
        });
    });
});