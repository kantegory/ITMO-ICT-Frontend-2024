<script setup>

</script>

<template>
  <header>
    <nav class="navbar-dark bg-dark">
      <div class="container bg-dark">
        <header class="d-flex justify-content-center py-3">
          <ul class="nav nav-pills">
            <li class="nav-item"><a href="#" class="nav-link">Предложения</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Личный кабинет</a></li>
            <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Сообщения</a></li>
          </ul>
          <form class="d-flex search-container ms-2">
            <input class="form-control search-input" type="search" placeholder="Search" aria-label="Search">
          </form>
        </header>
      </div>
    </nav>
  </header>
  <!--Навигационный бар закончился-->
  <main>
    <div class="container mt-5 ">
      <div class="mb-4">
        <h1>Личные сообщения:</h1>
      </div>
      <div class="message-card ">
        <div class="message-photo">
          <img src="https://images.cdn-cian.ru/images/2307481931-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2307481931-4.jpg">
        </div>
        <div class="message-info">
          <a href="#" class="message-title">1-комн. квартира, 48 м², 15/16 этаж</a>
          <div class="message-text">Здравствуйте!</div>
          <div class="message-status-open">Открыто</div>
        </div>
        <div class="message-meta">
          <div>Последнее обновление: 26.10.2024</div>
          <div>Цена: 50,000 ₽/месяц</div>
        </div>
      </div>

      <div class="message-card">
        <div class="message-photo">
          <img src="https://images.cdn-cian.ru/images/2103816967-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2103816967-4.jpg">
        </div>
        <div class="message-info">
          <a href="#" class="message-title">Апартаменты-студия, 19 м², 8/18 этаж</a>
          <div class="message-text">До свидания.</div>
          <div class="message-status-close">Закрыто</div>
        </div>
        <div class="message-meta">
          <div>Последнее обновление: 22.10.2024</div>
          <div>Цена: 35,000 ₽/месяц</div>
        </div>
      </div>

      <div class="message-card">
        <div class="message-photo">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-vitebskiy-prospekt-2280348381-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-vitebskiy-prospekt-2280348381-4.jpg">
        </div>
        <div class="message-info">
          <a href="#" class="message-title">Апартаменты-студия, 28 м², 7/14 этаж</a>
          <div class="message-text">И вам тоже!</div>
          <div class="message-status-open">Открыто</div>
        </div>
        <div class="message-meta">
          <div>Последнее обновление: 19.10.2024</div>
          <div>Цена: 45,000 ₽/месяц</div>
        </div>
      </div>
      <div class="message-card">
        <div class="message-photo">
          <img src="https://images.cdn-cian.ru/images/2303518651-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2303518651-4.jpg">
        </div>
        <div class="message-info">
          <a href="#" class="message-title">Апартаменты-студия, 24,5 м², 5/18 этаж</a>
          <div class="message-text">Жду.</div>
          <div class="message-status-open">Открыто</div>
        </div>
        <div class="message-meta">
          <div>Последнее обновление: 2.10.2024</div>
          <div>Цена: 60,000 ₽/месяц</div>
        </div>
      </div>
      <div class="message-card">
        <div class="message-photo">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-orlovskaya-ulica-2270220967-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-orlovskaya-ulica-2270220967-1.jpg">
        </div>
        <div class="message-info">
          <a href="#" class="message-title">5-комн. квартира, 192,2 м², 7/8 этаж</a>
          <div class="message-text">Я на вас пожалуюсь!</div>
          <div class="message-status-close">Закрыто</div>
        </div>
        <div class="message-meta">
          <div>Последнее обновление: 1.10.2024</div>
          <div>Цена: 170,000 ₽/месяц</div>
        </div>
      </div>
      <div class="message-card">
        <div class="message-photo">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-optikov-2304596767-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-optikov-2304596767-4.jpg">
        </div>
        <div class="message-info">
          <a href="#" class="message-title">1-комн. квартира, 45 м², 6/25 этаж</a>
          <div class="message-text">Только-только арендовали</div>
          <div class="message-status-close">Закрыто</div>
        </div>
        <div class="message-meta">
          <div>Последнее обновление: 25.09.2024</div>
          <div>Цена: 68,000 ₽/месяц</div>
        </div>
      </div>
      <div class="message-card">
        <div class="message-photo">
          <img src="https://images.cdn-cian.ru/images/2307040021-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2307040021-4.jpg">
        </div>
        <div class="message-info">
          <a href="#" class="message-title">2-комн. квартира, 110 м², 22/23 этаж</a>
          <div class="message-text">Цена окончательная</div>
          <div class="message-status-close">Закрыто</div>
        </div>
        <div class="message-meta">
          <div>Последнее обновление: 15.09.2024</div>
          <div>Цена: 160,000 ₽/месяц</div>
        </div>
      </div>
      <div class="message-card">
        <div class="message-photo">
          <img src="https://images.cdn-cian.ru/images/2283736934-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2283736934-4.jpg">
        </div>
        <div class="message-info">
          <a href="#" class="message-title">1-комн. квартира, 50 м², 6/9 этаж</a>
          <div class="message-text">Досвидания.</div>
          <div class="message-status-close">Закрыто</div>
        </div>
        <div class="message-meta">
          <div>Последнее обновление: 12.10.2024</div>
          <div>Цена: 75,000 ₽/месяц</div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center mt-4">
        <li class="page-item disabled">
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Следующая</a>
        </li>
      </ul>
    </nav>
  </main>
  <footer class="bg-dark text-white text-center py-3 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5>Контакты</h5>
          <p>sample@email.com</p>
          <p>+7 (XXX) XXX-XX-XX</p>
          <p>Адрес компании</p>
        </div>
        <div class="col-md-4">
          <h5>Информация</h5>
          <p><a href="#" class="text-white">Политика конфиденциальности</a></p>
          <p><a href="#" class="text-white">Условия использования</a></p>
          <p>&copy; 2024 Ваша компания. Все права защищены.</p>
        </div>
        <div class="col-md-4">
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
.message-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: .25rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
}

.message-photo {
  flex: 0 0 auto;
  width: 100px;
  height: 100px;
  border-radius: .25rem;
  overflow: hidden;
  margin-right: 1rem;
}

.message-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-info {
  flex-grow: 1;
  overflow: hidden;
  margin-right: 1rem;
}

.message-title {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000000;
}

.message-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6c757d;
}

.message-meta {
  text-align: right;
  font-size: 0.9rem;
}

.message-status-open{
  color: #62a270;
}

.message-status-close{
  color: #e37b5f;
}
.nav-link{
  color: #ffffff;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  width: 200px;
  max-width: 100%;
}
</style>