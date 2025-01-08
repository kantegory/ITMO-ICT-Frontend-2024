document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            const currentPage = window.location.pathname.split('/').pop();
            if (localStorage.getItem('token')) {
                document.querySelector('a[href="login.html"]').parentElement.classList.add('d-none');
                document.querySelector('a[href="registration.html"]').parentElement.classList.add('d-none');
            } else {
                document.querySelector('a[href="account.html"]').parentElement.classList.add('d-none');
            }
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});