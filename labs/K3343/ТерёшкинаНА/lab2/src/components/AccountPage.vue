<script setup>

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg custom-nav">
      <div class="container">
        <div class="d-flex justify-content-center w-100">
          <ul class="nav nav-pills">
            <li class="nav-item"><a href="#" class="nav-link">Рестораны</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Бронь</a></li>
            <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Аккаунт</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="container mt-5">
      <div class="account-container">
        <div class="user-info">
          <h4 class="ms-2">Аккаунт</h4>
          <div class="user-photo">
            <img src="image/user-photo.jpg" class="user-img-top" alt="image/user-photo.jpg">
            <a href="#" class="btn btn-primary">Изменить</a>
          </div>
          <div class="user-detail">
            <h6>Имя пользователя:</h6>
            <h4>Наталья</h4>
            <a href="#" class="btn btn-primary">Изменить</a>
          </div>
          <div class="user-detail">
            <h6>Email:</h6>
            <h4>nteresh@mail.ru</h4>
            <a href="#" class="btn btn-primary">Изменить</a>
          </div>
          <div class="user-detail">
            <h6>Пароль:</h6>
            <h4>1N2a3T4a</h4>
            <a href="#" class="btn btn-primary">Изменить</a>
          </div>
          <div class="user-detail">
            <h6>Номер телефона:</h6>
            <h4>+7 (911) 348-08-88</h4>
            <a href="#" class="btn btn-primary">Изменить</a>
          </div>
        </div>
        <div class="features">
          <div class="alert alert-warning" role="alert">
            <h4 class="alert-heading">Отлично!</h4>
            <p>Спасибо за регистрацию! Мы рады видеть Вас на нашем сайте. С нашей помощью Вы можете выбрать любой ресторан и забронировать в нем столик.</p>
            <hr>
            <p class="mb-0">Осталось внести последние штрихи и заполнить поле "Номер телефона"</p>
          </div>
          <h4 class="ms">Характеристики пользователя</h4>
          <div class="card">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Посещено заведений: 3</li>
              <li class="list-group-item">Количество предстоящих броней: 1</li>
              <li class="list-group-item">Ваше любимое место: Сельдерай</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="container">
      <p>&copy; 2024 Все права защищены.</p>
    </div>
  </footer>
</template>

<style scoped>
.custom-nav {
  background-color: #1a1b1c;
}
.nav-link {
  color: #c5cbe3;
}

.nav-link:hover {
  color: #deb658;
}

.nav-link:focus {
  color: #deb658;
}

.custom-nav .nav-link.active {
  color: #fff;
  background: linear-gradient(-135deg, #ff9100, #ffd441, #f6ae02);
}

.btn-primary {
  margin-top: 20px;
  background: linear-gradient(-135deg, #ff9100, #ffd441, #f6ae02);
  color: black;
  display: flow;
  border: none;
  border-radius: 6% / 50%;
}
.btn-primary:hover {
  transform: scale(1.05);
  transition: 0.3s ease;
}

.account-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.user-info, .features {
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 3rem;
}

.user-info {
  width: 30%;
  height: 120%;

}

.user-img-top {
  height: auto;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.user-photo img {
  width: 100%;
  height: auto;
  border-radius: 4rem;
}

.user-detail {
  margin-top: 10px;
}

.user-detail button {
  margin-top: 5px;
  width: 100%;
}

.features {
  width: 65%;
}

.deal-card img {
  width: 100%;
  height: auto;
  border-radius: .25rem;
  margin-bottom: 10px;
}

.nav-link{
  color: #ffffff;
}
footer {
  background-color: #1a1b1c;
  color: #c5cbe3;
  padding: 20px 0;
  margin-top: 100px;
  text-align: center;
}

.alert-warning {
  border-radius: 3rem;
}

.card {
  width: 100%;
}

@media (max-width: 768px) {
  .user-info, .features {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }
  .account-container {
    flex-direction: column;
  }

}
</style>