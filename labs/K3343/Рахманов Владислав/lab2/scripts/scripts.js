document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    var openModalButtons = document.querySelectorAll('.open-modal');

    openModalButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            var targetModalId = button.getAttribute('data-target');
            var targetModal = document.querySelector(targetModalId);
            var modal = new bootstrap.Modal(targetModal);
            modal.show();
        });
    });
});
