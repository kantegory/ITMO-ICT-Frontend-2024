document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) {
        console.error('Navbar container element not found');
        return;
    }

    // Fetch and inject the navbar
    fetch('../pages/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            navbarContainer.innerHTML = data;
            console.log('Navbar loaded successfully');
            
            // Wait for the DOM to update before setting up the theme switcher
            setTimeout(setupThemeSwitcher, 0); // Call setup after the DOM is updated
        })
        .catch(error => console.error('Error loading navbar:', error));
});

// Function to set up the theme switcher (called AFTER navbar is loaded)
function setupThemeSwitcher() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    
    // Log theme switcher to check if it's loaded
    console.log('Theme switcher element:', themeSwitcher);

    if (!themeSwitcher) {
        console.error('Theme switcher button not found');
        return;
    }

    // Apply saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Toggle theme on click
    themeSwitcher.addEventListener('click', () => {
        console.log('Theme switcher clicked');
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });
}

// Function to apply the theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);

    // Update button text based on current theme
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (themeSwitcher) {
        themeSwitcher.textContent = theme === 'dark' ? '🌞' : '🌚';
    }
}