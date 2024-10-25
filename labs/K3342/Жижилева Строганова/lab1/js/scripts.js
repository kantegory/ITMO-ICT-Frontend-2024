// Валидация форм
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Логика валидации
  alert("Login form submitted!");
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
  } else {
    alert("Registration form submitted!");
  }
});

// Лайк на странице рецепта
let likeCount = 0;
document.getElementById('likeBtn').addEventListener('click', function() {
  likeCount++;
  document.getElementById('likeCount').innerText = likeCount;
});
