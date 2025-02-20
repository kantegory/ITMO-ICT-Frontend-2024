document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) {
        console.error('Navbar container element not found');
        return;
    }
    fetch('../pages/navbar.html')
        .then(response => {
            console.log('Fetch URL:', response.url);
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            navbarContainer.innerHTML = data;
            console.log('Navbar loaded successfully');
        })
        .catch(error => console.error('Error loading navbar:', error));
});