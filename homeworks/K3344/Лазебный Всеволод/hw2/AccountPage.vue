<script setup>

</script>

<template>
  <header>
    <nav class="navbar-dark bg-dark">
      <div class="container bg-dark">
        <header class="responsive-header d-flex justify-content-center py-3">
          <ul class="nav nav-pills">
            <li class="nav-item"><a href="#" class="nav-link">Предложения</a></li>
            <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Личный кабинет</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Сообщения</a></li>
          </ul>
          <form class="d-flex search-container">
            <input
                class="form-control search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
            />
          </form>
        </header>
      </div>
    </nav>
  </header>
  <!--Навигационный бар закончился-->
  <main>
    <div class="container mt-5">
      <div class="account-container">
        <div class="user-info">
          <h4 class="ms-2">Аккаунт</h4>
          <div class="user-photo">
            <img src="../assets/image/user-photo.png" class="user-img-top" alt="image/user-photo.png">
          </div>
          <div class="user-detail">
            <h6>Имя пользователя:</h6>
            <h4>Всеволод</h4>
            <button class="btn btn-primary btn-sm">Изменить</button>
          </div>
          <div class="user-detail">
            <h6>Email:</h6>
            <h4>vllazebnyi@gmail.com</h4>
            <button class="btn btn-primary btn-sm">Изменить</button>
          </div>
          <div class="user-detail">
            <h6>Пароль:</h6>
            <h4>qwerTY$12&52</h4>
            <button class="btn btn-primary btn-sm">Изменить</button>
          </div>
        </div>
        <div class="deals">
          <h4 class="ms-3">Открытые сделки</h4>
          <div class="deal-card">
            <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-matrosa-zheleznyaka-2299586219-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-matrosa-zheleznyaka-2299586219-1.jpg">
            <h2><a href="#" class="message-title">Студия, 18 м², 1/6 этаж</a></h2>
            <h4>Цена: 30,000 ₽</h4>
            <p>Характеристика: Просторная квартира с видом на парк</p>
            <h5>О владельце:</h5>
            <p>ФИО: Иванов Иван Иванович</p>
            <p>Email: owner@example.com</p>
            <p>Телефон: +7 (XXX) XXX-XX-XX</p>
          </div>

          <h4 class="ms-3">Закрытые сделки</h4>
          <div class="closed-deals">
            <div class="closed-deal">
              <img src="https://images.cdn-cian.ru/images/2283736934-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2283736934-4.jpg">
              <div class="message-info">
                <a href="#" class="message-title">1-комн. квартира, 50 м², 6/9 этаж</a>
                <div class="message-text">+7 (XXX) XXX-XX-XX</div>
                <p>Дата закрытия: 01.10.2024</p>
              </div>
              <div class="message-meta">
                <p>Цена: 50,000 ₽</p>
                <a href="#" class="btn btn-primary mt-1">Оставить отзыв</a>
              </div>
            </div>

            <div class="closed-deal">
              <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-optikov-2304596767-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-vitebskiy-prospekt-2280348381-4.jpg">
              <div class="message-info">
                <a href="#" class="message-title">большая студия, 15 м², 8/18 этаж</a>
                <div class="message-text">+7 (XXX) XXX-XX-XX</div>
                <p>Дата закрытия: 15.05.2024</p>
              </div>
              <div class="message-meta">
                <p>Цена: 45,000 ₽</p>
                <a href="#" class="btn btn-primary mt-1">Оставить отзыв</a>
              </div>
            </div>

            <div class="closed-deal">
              <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-vitebskiy-prospekt-2280348381-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-vitebskiy-prospekt-2280348381-4.jpg">
              <div class="message-info">
                <a href="#" class="message-title">Апарт-студия, 19 м², 8/18 этаж</a>
                <div class="message-text">+7 (XXX) XXX-XX-XX</div>
                <p>Дата закрытия: 11.01.2024</p>
              </div>
              <div class="message-meta">
                <p>Цена: 30,000 ₽</p>
                <a href="#" class="btn btn-primary mt-1">Оставить отзыв</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
  <footer class="bg-dark text-white text-center py-3 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4 contact-block">
          <h5>Контакты</h5>
          <p>sample@email.com</p>
          <p>+7 (XXX) XXX-XX-XX</p>
          <p>Адрес компании</p>
        </div>
        <div class="col-md-4 info-block">
          <h5>Информация</h5>
          <p><a href="#" class="text-white">Политика конфиденциальности</a></p>
          <p><a href="#" class="text-white">Условия использования</a></p>
          <p>&copy; 2024 Ваша компания. Все права защищены.</p>
        </div>
        <div class="col-md-4 social-block">
          <h5>Социальные сети</h5>
          <a href="#" class="text-white me-2"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="text-white me-2"><i class="fab fa-instagram"></i></a>
          <a href="#" class="text-white me-2"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-white me-2"><i class="fab fa-vk"></i></a>
        </div>
      </div>
    </div>
  </footer>

</template>

<style scoped>
.card-img-top {
  height: auto;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.message-title {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000000;
}

.account-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.user-info, .deals {
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: .25rem;
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
  border-radius: .25rem;
}

.user-detail {
  margin-top: 10px;
}

.user-detail button {
  margin-top: 5px;
  width: 100%;
}

.deals {
  width: 65%;
}

.deal-card {
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: .25rem;
}

.deal-card img {
  width: 100%;
  height: auto;
  border-radius: .25rem;
  margin-bottom: 10px;
}

.closed-deals .closed-deal {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: .25rem;
  margin-bottom: 10px;
}

.closed-deal img {
  width: 80px;
  height: 80px;
  border-radius: .25rem;
  margin-right: 10px;
}

.nav-link{
  color: #ffffff;
}

.message-info {
  flex-grow: 1;
  overflow: hidden;
  margin-right: 1rem;
}

.account-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
}

.user-info, .deals {
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: .25rem;
  box-sizing: border-box;
}

.user-info {
  width: 30%;
  height: 100%;
}

.deals {
  width: 65%;
}

@media (max-width: 768px) {
  .user-info, .deals {
    width: 100%;
    margin-bottom: 20px;
  }

  .responsive-header {
    flex-direction: column;
    align-items: center;
  }

  .nav-pills {
    margin-bottom: 15px;
  }

  .search-container {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .search-input {
    width: 90%;
    max-width: 300px;
  }

  footer{
    font-size: 2vw;
  }

  .nav-link{
    font-size: 3vw;
  }
  .message-info {
    font-size: 3vw;
  }
  .message-meta {
    font-size: 3vw;
  }
  .btn-primary {
    font-size: 2vw;
  }

  footer {
    display: flex;
    flex-direction: row;
  }

  .info-block {
    text-align: right;
    width: 50%;
  }

  .contact-block {
    text-align: left;
    width: 50%;
  }

  .social-block {
    width: 100%;
  }

  .info-block {
    order: 2;
  }

  .contact-block {
    order: 1;
  }

  .social-block {
    order: 3;
  }

  .footer h5 {
    font-size: 10px;
  }

  .footer p, .footer a {
    font-size: 10px;
  }
}
</style>