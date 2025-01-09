<template>
  <div class="container restaurant-info">
    <div class="row">
      <div class="col-md-6">
        <h3>Ресторан "Название"</h3>
        <p><strong>Адрес:</strong> ул. Центральная, 12, Москва</p>
        <p><strong>Средний чек:</strong> 1500 руб.</p>
        <h4>Бронирование стола</h4>
        <form class="reservation-form">
          <div class="mb-3">
            <label for="numGuests" class="form-label">Количество человек</label>
            <input type="number" class="form-control" id="numGuests" min="1" max="10">
          </div>
          <div class="mb-3">
            <label for="time" class="form-label">Время</label>
            <input type="time" class="form-control" id="time">
          </div>
          <button type="submit" class="btn btn-primary">Забронировать</button>
        </form>
      </div>
      <div class="col-md-6">
        <h4 class="map-block">На карте:</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-nav {
  background-color: #1a1b1c;
}
.nav-link {
  color: #c5cbe3;
}

.nav-link:hover {
  color: #deb658; /
}
.nav-link:focus {
  color: #deb658;
}
.custom-nav .nav-link.active {
  color: #fff;
  background: linear-gradient(-135deg, #ff9100, #ffd441, #f6ae02);
}
footer {
  background-color: #1a1b1c;
  color: #c5cbe3;
  padding: 20px 0;
  margin-top: 100px;
  text-align: center;
}
.d-block {
  height: auto;
  width: 100%;
  aspect-ratio: 3 / 1;
  object-fit: cover;
}
.restaurant-info {
  color: #c5cbe3;
  margin-top: 20px;
  margin-bottom: 20px;
}
.reservation-form input, .reservation-form button {
  margin-top: 10px;
}
.btn-primary {
  margin-top: 20px;
  background: linear-gradient(-135deg, #ff9100, #ffd441, #f6ae02);
  color: black;
  display: flow;
  border: none;
  border-radius: 15% / 45%;
}
.btn-primary:hover {
  color: white;
  transform: scale(1.05);
  transition: 0.3s ease;
}
</style>