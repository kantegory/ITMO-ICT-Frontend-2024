// This file contains general JavaScript functions used across the platform, such as event listeners and utility functions.

document.addEventListener('DOMContentLoaded', function() {
    // Add any global event listeners or initialization code here
});

// Utility function to show alerts
function showAlert(message, type = 'info') {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// Function to toggle the mobile navigation menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
}

// Add more utility functions as needed for the platform
