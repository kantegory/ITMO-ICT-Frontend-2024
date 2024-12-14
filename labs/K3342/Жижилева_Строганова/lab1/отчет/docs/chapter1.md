# Страница входа

Для реализации страницы входа, мы создали файл log_in.html

**код из файла log_in.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login | Recipe App</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/styles.css"> <!-- Подключение стилей из styles.css -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body onload="fadeIn()">
  <div class="container fade-in">
    <h2 class="text-center my-4">Login to Recipe App</h2>
    <form class="col-md-6 mx-auto" id="loginForm">
      <div class="form-group">
        <label for="email">Email</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
          </div>
          <input type="email" class="form-control" id="email" placeholder="Enter email">
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-lock"></i></span>
          </div>
          <input type="password" class="form-control" id="password" placeholder="Enter password">
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Login</button>
      <a href="register.html" class="d-block text-center mt-3">Don't have an account? Register here</a>
    </form>
  </div>

  <!-- Модальное окно для успешного входа -->
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Login Successful</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Welcome back! You are being redirected to your profile.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

  <script>
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
  </script>
</body>
</html>

```
**Вид страницы входа на скриншоте**
![Вид страницы входа на скриншоте](images/log_in.png)
**Модальное окно при входе на скриншоте**
![Модальное окно при входе на скриншоте](images/mod_window_log_in.png)