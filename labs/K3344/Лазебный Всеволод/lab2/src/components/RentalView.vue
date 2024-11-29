<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mapContainer = ref(null);
const map = ref(null);


const initMap = (lat, lon) => {
  map.value = L.map(mapContainer.value).setView([lat, lon], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map.value);

  L.popup()
      .setLatLng([lat, lon])
      .setContent('ЖК Премьер Палас')
      .openOn(map.value);
};

const fetchCoordinates = async (locationName) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json`);
    const data = await response.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      initMap(lat, lon);
    } else {
      console.error('Координаты не найдены для указанного местоположения.');
    }
  } catch (error) {
    console.error('Ошибка при получении координат:', error);
  }
};

onMounted(() => {
  fetchCoordinates('ЖК Премьер Палас');
});
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
    <div class="mb-4">
      <h1>Сдается 2-комн. квартира, 75 м² в ЖК «Премьер Палас»</h1>
    </div>
    <div class="row">
      <!-- Картиночки -->
      <div class="col-md-8">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://images.cdn-cian.ru/images/2297254359-1.jpg" class="d-block w-100" alt="https://images.cdn-cian.ru/images/2297254359-1.jpg">
            </div>
            <div class="carousel-item">
              <img src="https://images.cdn-cian.ru/images/2297254619-1.jpg" class="d-block w-100" alt="https://images.cdn-cian.ru/images/2297254619-1.jpg">
            </div>
            <div class="carousel-item">
              <img src="https://images.cdn-cian.ru/images/2297255475-1.jpg" class="d-block w-100" alt="https://images.cdn-cian.ru/images/2297255475-1.jpg">
            </div>
            <div class="carousel-item">
              <img src="https://images.cdn-cian.ru/images/2297256534-1.jpg" class="d-block w-100" alt="https://images.cdn-cian.ru/images/2297256534-1.jpg">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="mt-3">
          <h4>Описание</h4>
          <p>Квартира в престижном жилом комплексе с современным ремонтом и полной инфраструктурой. Просторные комнаты, кухня и гостиная, оборудованная техникой. Близость к общественному транспорту и торговым центрам.</p>
        </div>
      </div>
      <div class="col-md-4">
        <h3>Цена: <strong>150 000 ₽/мес</strong></h3>
        <h4>характеристики:</h4>
        <ul>
          <li>Этаж: 7 из 24</li>
          <li>Количество комнат: 2</li>
          <li>Площадь: 75 м²</li>
          <li>Совмещенный санузел</li>
        </ul>
        <button class="btn btn-primary w-100 mt-3">Показать контакты</button>
        <div class="mt-4">
          <h4>На карте:</h4>
          <div ref="mapContainer" style="height: 300px;"></div> <!-- Контейнер для карты -->
        </div>
      </div>
    </div>
    <div class="text-center mt-5">
      <h4>Рекомендации</h4>
    </div>
    <div class="d-flex justify-content-between mt-4 row mx-auto">
      <div class="col-12 col-xl-4 col-md-6 mb-4">
        <div class="card">
          <img src="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-matrosa-zheleznyaka-2299586219-1.jpg" class="card-img-top" alt="https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-matrosa-zheleznyaka-2299586219-1.jpg">
          <div class="card-body">
            <h5 class="card-title">Студия, 18 м², 1/6 эт.</h5>
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
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Посмотреть</a>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer class="bg-dark text-white text-center py-3 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5>Контакты</h5>
          <p>sample@email.com</p>
          <p>+7 (ХХХ) ХХХ-ХХ-ХХ</p>
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
.d-block {
  height: auto;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}
.card-img-top {
  height: auto;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}
.card{
  height: 420px;
}
.card-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-primary{
  display: flow;
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