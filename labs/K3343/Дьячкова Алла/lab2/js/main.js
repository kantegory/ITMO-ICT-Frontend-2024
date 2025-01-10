// main.js

document.addEventListener("DOMContentLoaded", function() {
    // Пример функционала для открытия модального окна
    const openModalButtons = document.querySelectorAll("[data-toggle='modal']");
    openModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-target");
            const modal = document.querySelector(target);
            modal.classList.add("show");
            modal.style.display = "block";
        });
    });

    // Закрытие модального окна
    const closeModalButtons = document.querySelectorAll(".close-modal");
    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            modal.classList.remove("show");
            modal.style.display = "none";
        });
    });

    // Пример фильтрации по цене на странице поиска
    const filterForm = document.getElementById("filter-form");
    if (filterForm) {
        filterForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const maxPrice = document.getElementById("max-price").value;
            const properties = document.querySelectorAll(".property-card");
            properties.forEach(card => {
                const price = parseInt(card.getAttribute("data-price"));
                if (price > maxPrice) {
                    card.style.display = "none";
                } else {
                    card.style.display = "block";
                }
            });
        });
    }

    // Пример валидации формы регистрации
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            if (password !== confirmPassword) {
                event.preventDefault();
                alert("Пароли не совпадают!");
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
});