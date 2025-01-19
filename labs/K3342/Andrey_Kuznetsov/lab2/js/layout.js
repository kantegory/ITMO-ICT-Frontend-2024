setTimeout(() => {
    fetch('../html/components/header.html?t=' + Date.now())
    .then(response => response.text())
    .then(data => {
        console.log('Header HTML:', data); // Выводим загруженный HTML
        document.getElementById('header-container').innerHTML = data;
        console.log(document.getElementById('header-container'));
        
        const menuItems = document.querySelectorAll('.menu li a');
        console.log(menuItems);
        const str =  window.location.pathname; 
        const currentPath = str.substring(str.indexOf('/html'));
        const authPath = '/html/auth.html'
        const profilePath = '/html/profile.html'

        menuItems.forEach(item => {
            const linkPath = item.getAttribute('href').replace('..', '');

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
}, 10);
