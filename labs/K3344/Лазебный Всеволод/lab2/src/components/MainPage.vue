<script setup>

</script>

<template>
  <header>
    <nav class="navbar-dark bg-dark">
      <div class="container bg-dark">
        <header class="d-flex justify-content-center py-3">
          <ul class="nav nav-pills nav-dark bg-dark">
            <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Предложения</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Личный кабинет</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Сообщения</a></li>
          </ul>
          <form class="d-flex search-container ms-2">
            <input class="form-control search-input" type="search" placeholder="Search" aria-label="Search">
          </form>
        </header>
      </div>
    </nav>
  </header>
  <!--Навигационный бар закончился-->
  <main class="container mt-5">
    <!-- Форма фильтрации -->
    <div class="filter">
      <form class="mb-4">
        <div class="row">
          <div class="col-md-4 mb-3">
            <select class="form-select" aria-label="Фильтр по типу">
              <option value="all" selected>Все типы</option>
              <option value="room">Квартира</option>
              <option value="studio">Cтудия</option>
              <option value="apartment">Апартаменты</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <button class="btn btn-outline-primary" type="submit">Применить фильтр</button>
          </div>
        </div>
      </form>
    </div>
    <!-- Список карточек -->
    <div class="d-flex justify-content-between mt-1 row mx-auto">
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/2307481931-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2307481931-4.jpg">
          <div class="card-body">
            <h5 class="card-title">1-комн. квартира, 48 м², 15/16 этаж</h5>
            <h5 class="price">45,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-matrosa-zheleznyaka-2299586219-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-matrosa-zheleznyaka-2299586219-1.jpg">
          <div class="card-body">
            <h5 class="card-title">Студия, 18 м², 1/6 эт.</h5>
            <h5 class="price">30,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-vitebskiy-prospekt-2280348381-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-vitebskiy-prospekt-2280348381-1.jpg">
          <div class="card-body">
            <h5 class="card-title">Апартаменты-студия, 12 м², 1/6 этаж</h5>
            <h5 class="price">75,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-naberezhnaya-reki-moyki-2283526209-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-naberezhnaya-reki-moyki-2283526209-1.jpg">
          <div class="card-body">
            <h5 class="card-title">3-комн. квартира, 60 м², 6/6 этаж</h5>
            <h5 class="price">140,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-moskovskiy-prospekt-2304507956-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-moskovskiy-prospekt-2304507956-1.jpg">
          <div class="card-body">
            <h5 class="card-title">Студия, 35 м², 3/5 этаж</h5>
            <h5 class="price">67,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-12-ya-vasilevskogo-ostrova-liniya-2288845089-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-12-ya-vasilevskogo-ostrova-liniya-2288845089-1.jpg">
          <div class="card-body">
            <h5 class="card-title">2-комн. квартира, 60 м², 2/9 этаж</h5>
            <h5 class="price">78,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/2306760707-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2306760707-1.jpg">
          <div class="card-body">
            <h5 class="card-title">Апартаменты, 40 м², 5/10 этаж</h5>
            <h5 class="price">198,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/2302712824-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2302712824-1.jpg">
          <div class="card-body">
            <h5 class="card-title">3-комн. квартира, 75 м², 1/12 этаж</h5>
            <h5 class="price">230,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-srednerogatskaya-ulica-2305442385-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-srednerogatskaya-ulica-2305442385-1.jpg">
          <div class="card-body">
            <h5 class="card-title">Студия, 22 м², 4/7 этаж</h5>
            <h5 class="price">40,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/2285974787-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2285974787-4.jpg">
          <div class="card-body">
            <h5 class="card-title">2-комн. квартира, 66,4 м²</h5>
            <h5 class="price">130,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-vosstaniya-2306270695-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-vosstaniya-2306270695-1.jpg">
          <div class="card-body">
            <h5 class="card-title">1-комн. квартира, 48 м², 6/6 этаж</h5>
            <h5 class="price">59,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/2307371069-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2307371069-4.jpg">
          <div class="card-body">
            <h5 class="card-title">2-комн. квартира, 51 м², 7/8 этаж</h5>
            <h5 class="price">82,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/2280340817-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/2280340817-4.jpg">
          <div class="card-body">
            <h5 class="card-title">3-комн. квартира, 57,3 м², 4/10 этаж</h5>
            <h5 class="price">134,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/36/754/611/kvartira-sanktpeterburg-begovaya-ulica-1164576370-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/36/754/611/kvartira-sanktpeterburg-begovaya-ulica-1164576370-4.jpg">
          <div class="card-body">
            <h5 class="card-title">2-комн. квартира, 56 м², 1/5 этаж</h5>
            <h5 class="price">114,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-kievskaya-ulica-2249302642-4.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-kievskaya-ulica-2249302642-4.jpg">
          <div class="card-body">
            <h5 class="card-title">Апартаменты-студия, 31 м², 6/20 этаж</h5>
            <h5 class="price">48,000р/мес.</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center mt-4">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Предыдущая</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Следующая</a>
        </li>
      </ul>
    </nav>
    <!--список квартир для аренды закончился-->
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
.card-img-top {
  height: auto;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}
.card{
  height: 460px;
}
.card-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-primary{
  display: flow;
}
.filter{
  position: relative;
  left: 12px;
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