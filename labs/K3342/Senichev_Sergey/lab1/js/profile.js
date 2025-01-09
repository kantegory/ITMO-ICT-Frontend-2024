document.addEventListener('DOMContentLoaded', function() {
    function loadProfileData() {
        // TODO логика загрузки данных
        console.log('Загрузка данных профиля');
    }

    // Обработка меню профиля
    const menuItems = document.querySelectorAll('.profile-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            // TODO логика переключения разделов
        });
    });

    loadProfileData();
});