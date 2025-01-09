fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        checkUserStatus();
    });

fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

function checkUserStatus() {
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    const authLinks = document.getElementById('authLinks');
    const userLinks = document.getElementById('userLinks');
    const logoutButton = document.getElementById('logoutButton');

    if (loggedInUserId) {
        authLinks.style.display = 'none';
        userLinks.style.display = 'block';
    } else {
        authLinks.style.display = 'block';
        userLinks.style.display = 'none';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedInUserId');
            window.location.href = 'enter.html';
        });
    }
}
