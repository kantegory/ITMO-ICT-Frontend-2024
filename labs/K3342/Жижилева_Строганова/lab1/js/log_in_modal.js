function fadeIn() {
  document.querySelector('.fade-in').style.opacity = 1;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var myModal = new bootstrap.Modal(document.getElementById('loginModal'));

  myModal.show();

  document.getElementById('loginModal').addEventListener('hidden.bs.modal', function () {
    window.location.href = 'profile.html';

  });
});
