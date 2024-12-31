<script setup>

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg custom-nav">
      <div class="container">
        <div class="d-flex justify-content-center w-100">
          <ul class="nav nav-pills">
            <li class="nav-item"><a href="#" class="nav-link">Рестораны</a></li>
            <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Бронь</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Аккаунт</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="container mt-5">
      <div class="main-mb-4 text-center">
        <h1 class="block-title">Бронь</h1>
        <div class="d-flex justify-content-center flex-wrap">
          <div class="main-reservation-card mx-2">
            <div class="message-photo">
              <img src="https://welcome.mosreg.ru/cache/thumbs/thumb_1024_576_94276578.jpg" class="card-img-top" alt="Квартира">
            </div>
            <div class="message-info">
              <h4 href="#" class="message-title">Чехов</h4>
              <div class="stars">
                <div class="stars">
                  <label for="star1_2" class="fa fa-star"></label>
                  <label for="star2_2" class="fa fa-star"></label>
                  <label for="star3_2" class="fa fa-star"></label>
                  <label for="star4_2" class="fa fa-star"></label>
                  <label for="star5_2" class="fa fa-star"></label>
                </div>
              </div>
            </div>
            <div class="message-meta">
              <div>Дата: 01.01.2024</div>
              <div>Кол-во людей: 2</div>
            </div>
          </div>
        </div>

        <div class="other-mb-4 text-center">
          <h1 class="block-title">История</h1>
          <div class="d-flex justify-content-center flex-wrap">
            <div class="reservation-card mx-2">
              <div class="message-photo">
                <img src="https://madloba.info/media/images/sushi-bars-06.2e16d0ba.fill-1200x630.format-png.png" class="card-img-top" alt="Квартира">
              </div>
              <div class="message-info">
                <h5 href="#" class="message-title">Бригантина</h5>
                <div class="stars">
                  <div class="stars">
                    <label for="star1_2" class="fa fa-star"></label>
                    <label for="star2_2" class="fa fa-star"></label>
                    <label for="star3_2" class="fa fa-star"></label>
                    <label for="star4_2" class="fa fa-star"></label>
                    <label for="star5_2" class="fa fa-star"></label>
                  </div>
                </div>
              </div>
              <div class="message-meta">
                <div>Дата: 01.01.2024</div>
                <div>Кол-во людей: 2</div>
              </div>
            </div>

            <div class="reservation-card mx-2">
              <div class="message-photo">
                <img src="https://findesk.ru/upload/iblock/bee/bee4de9021bf54ea163b2e0a086aeb70.jpeg" class="card-img-top" alt="Апартаменты-студия">
              </div>
              <div class="message-info">
                <h5 href="#" class="message-title">Сельдерай</h5>
                <div class="stars">
                  <div class="stars">
                    <label for="star1_3" class="fa fa-star"></label>
                    <label for="star2_3" class="fa fa-star"></label>
                    <label for="star3_3" class="fa fa-star"></label>
                    <label for="star4_3" class="fa fa-star"></label>
                    <label for="star5_3" class="fa fa-star"></label>
                  </div>
                </div>
              </div>
              <div class="message-meta">
                <div>Дата: 01.01.2024</div>
                <div>Кол-во людей: 2</div>
              </div>
            </div>

            <div class="reservation-card mx-2">
              <div class="message-photo">
                <img src="https://uptrend.ru/upload/medialibrary/964/96415e11c2ce66c724dab0502bdfabcc.jpg" class="card-img-top" alt="Студия">
              </div>
              <div class="message-info">
                <h5 href="#" class="message-title">Селедка</h5>
                <div class="stars">
                  <div class="stars">
                    <label for="star1_4" class="fa fa-star"></label>
                    <label for="star2_4" class="fa fa-star"></label>
                    <label for="star3_4" class="fa fa-star"></label>
                    <label for="star4_4" class="fa fa-star"></label>
                    <label for="star5_4" class="fa fa-star"></label>
                  </div>
                </div>
              </div>
              <div class="message-meta">
                <div>Дата: 01.01.2024</div>
                <div>Кол-во людей: 2</div>
              </div>
            </div>
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
.nav-link:hover, .nav-link:focus {
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
.reservation-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 2% / 20%;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
  width: 80%;
}
.main-reservation-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 2% / 20%;
  padding: 1rem;
  margin-bottom: 50px;
  background-color: #f8f9fa;
  width: 90%;
}
.message-photo {
  flex: 0 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 25% / 25%;
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

.message-meta {
  text-align: right;
  font-size: 0.9rem;
}

.nav-link{
  color: #ffffff;
}
h1 {
  color: #ffffff;
}
.stars {
  gap: 5px;
}
.block-title {
  margin-bottom: 20px;
}.reservation-card {
   display: flex;
   align-items: center;
   justify-content: space-between;
   border: 1px solid #ddd;
   border-radius: 2rem;
   padding: 1rem;
   margin-bottom: 1rem;
   background-color: #f8f9fa;
   width: 80%;
 }
.main-reservation-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 2rem;
  padding: 1rem;
  margin-bottom: 50px;
  background-color: #f8f9fa;
  width: 90%;
}
.message-photo {
  flex: 0 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 25% / 25%;
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

.message-meta {
  text-align: right;
  font-size: 0.9rem;
}

.nav-link {
  color: #ffffff;
}
h1 {
  color: #ffffff;
}
.stars {
  color: #f6ae02;
  gap: 5px;
}
.block-title {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .reservation-card, .main-reservation-card {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    border-radius: 10% / 10%;
  }
  .message-photo {
    width: 100%;
    aspect-ratio: 3 / 2;
    height: auto;
    margin-right: 0;
    margin-bottom: 1rem;
    border-radius: 7% / 10%;
  }
  .message-info {
    margin-left: 8%;
  }
  .message-meta {
    margin-left: 8%;
    font-size: 0.9rem;
  }

}
</style>