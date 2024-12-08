document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // TODO: добавить логику авторизации
            console.log('Форма отправлена');

            window.location.href = '../pages/profile.html';
        });
    }
});