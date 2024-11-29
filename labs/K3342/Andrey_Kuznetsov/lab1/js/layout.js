// Загружаем заголовок
fetch('../html/components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        
        const menuItems = document.querySelectorAll('.menu li a');
        const currentPath = window.location.pathname;
        const authPath = '/html/auth.html'
        const profilePath = '/html/profile.html'

        menuItems.forEach(item => {
            const linkPath = item.getAttribute('href').replace('..', '');

            console.log(linkPath, currentPath);

            if (linkPath === currentPath) {
                item.parentElement.classList.add('active'); 
            } else {
                item.parentElement.classList.remove('active'); 
            }

            if (currentPath == authPath && linkPath == profilePath) {
                item.parentElement.classList.add('active'); 
            }
        });
    })
    .catch(error => console.error('Error loading header:', error));
