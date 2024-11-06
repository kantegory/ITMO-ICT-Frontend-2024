// Анимация для плавного появления контента
function fadeIn() {
  document.querySelector('.fade-in').style.opacity = 1;
}

// Обработчик события отправки формы
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Останавливаем отправку формы

  // Показываем модальное окно
  $('#loginModal').modal('show');

  // Перенаправляем на страницу профиля после закрытия модального окна
  $('#loginModal').on('hidden.bs.modal', function () {
    window.location.href = 'profile.html';
  });
});
