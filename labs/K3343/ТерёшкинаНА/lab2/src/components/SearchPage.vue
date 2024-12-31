<script setup>

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg custom-nav">
      <div class="container">
        <div class="d-flex justify-content-center w-100">
          <ul class="nav nav-pills">
            <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Рестораны</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Бронь</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Аккаунт</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <searcher>
    <div class="row searchFilter" >
      <div class="col-sm-12" >
        <div class="input-group" >
          <input id="table_filter" type="text" class="form-control" aria-label="Text input with segmented button dropdown" >
          <div class="input-group-btn" >
            <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="label-icon" >Category</span> <span class="caret" >&nbsp;</span></button>
            <div class="dropdown-menu dropdown-menu-right" >
              <ul class="category_filters" >
                <li >
                  <input class="cat_type category-input" data-label="All" id="all" value="" name="radios" type="radio" ><label for="all" >All</label>
                </li>
                <li >
                  <input type="radio" name="radios" id="Design" value="Design" ><label class="category-label" for="Design" >Design</label>
                </li>
                <li >
                  <input type="radio" name="radios" id="Marketing" value="Marketing" ><label class="category-label" for="Marketing" >Marketing</label>
                </li>
                <li >
                  <input type="radio" name="radios" id="Programming" value="Programming" ><label class="category-label" for="Programming" >Programming</label>
                </li>
                <li >
                  <input type="radio" name="radios" id="Sales" value="Sales" ><label class="category-label" for="Sales" >Sales</label>
                </li>
                <li >
                  <input type="radio" name="radios" id="Support" value="Support" ><label class="category-label" for="Support" >Support</label>
                </li>
              </ul>
            </div>
            <button id="searchBtn" type="button" class="btn btn-secondary btn-search" ><span class="glyphicon glyphicon-search" >&nbsp;</span> <span class="label-icon" >Search</span></button>
          </div>
        </div>
      </div>
    </div>
  </searcher>
  <!-- Блок для пабов -->
  <div class="section-title">Пабы</div>
  <div class="card-container">
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://welcome.mosreg.ru/cache/thumbs/thumb_1024_576_94276578.jpg" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://avatars.mds.yandex.net/get-altay/200322/2a0000015b15dbbeda35dcd808741135ea65/XXL" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://img.restoclub.ru/uploads/place/5/6/f/a/56fa10923e7a53042d2b5298f5e92ce9_w1200_h630--c.jpeg" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://avatars.mds.yandex.net/get-altay/372953/2a0000018655f5defe4d6d9b7523dfedee6a/orig" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://www.restoran.ru/upload/editor/0b4/12d72.jpg" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://i.archi.ru/i/389669.jpg" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Блок для суши -->
  <div class="section-title">Суши</div>
  <div class="card-container">
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://avatars.mds.yandex.net/i?id=ecd3953edd844d403a2672967a39e940_l-5231989-images-thumbs&n=13" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://i.pinimg.com/originals/da/9c/18/da9c189888d2ccb1d7ffe0c804fadd03.jpg" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://findesk.ru/upload/iblock/bee/bee4de9021bf54ea163b2e0a086aeb70.jpeg" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://avatars.mds.yandex.net/get-altay/1899727/2a0000016ad519a1301d4ae11084d2b959c1/XXL_height" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://madloba.info/media/images/sushi-bars-06.2e16d0ba.fill-1200x630.format-png.png" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://uptrend.ru/upload/medialibrary/964/96415e11c2ce66c724dab0502bdfabcc.jpg" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
  </div>
  <!-- Блок для пиццерий -->
  <div class="section-title">Пиццерии</div>
  <div class="card-container">
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://i.pinimg.com/originals/b5/3d/50/b53d50b1bae70d727fceca8657ddc41a.jpg" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://avatars.mds.yandex.net/get-altay/5477999/2a0000017d3258355c0aae36a8ece132efa4/XXL" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://avatars.mds.yandex.net/i?id=72c4042a4be33a160a138a52af264ef6_l-10522468-images-thumbs&ref=rim&n=13&w=1920&h=1289" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://burobiz-a.akamaihd.net/uploads/images/137137/large_%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D0%BF%D0%B8%D1%86%D0%B5%D1%80%D0%B8%D1%8F2222.JPG" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://via.placeholder.com/200x150" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-3 col-md-3 mb-4">
      <div class="card">
        <img src="https://get.pxhere.com/photo/cafe-interior-restaurant-bar-interior-design-chairs-pizzeria-dining-tables-1284385.jpg" class="card-img-top" alt="https://via.placeholder.com/200x150">
        <div class="card-body">
          <h5 class="card-title">Ресторан1</h5>
          <h5 class="price">Ближайшее время:18:00</h5>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
  </div>
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
.searchFilter {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 5px;
  margin-right: 5px;
}
.searchFilter .btn-secondary {
  color: #373a3c;
  background-color: #fff;
  border: 1px solid #ccc;
  outline: none;
}
.searchFilter .btn-secondary:hover {
  color: #373a3c;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.searchFilter .btn-search {
  background: linear-gradient(-135deg, #ff9100, #ffd441, #f6ae02);
  color: #fff;
  border: 1px solid;
  outline: none;
}
.searchFilter .btn-search:hover {
  transform: scale(1.05);
  transition: 0.3s ease;
}
.card-img-top {
  height: auto;
  width: 94.5%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: 7% / 10%;
  margin: 10px;
}
.card {
  height: 100%;
  width: 100%;
  margin: 0 10px;
  border-radius: 6% / 5%;
}
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  color: white;
  transform: scale(1.05);
  transition: 0.3s ease;
}
.section-title {
  text-align: center;
  font-size: 2em;
  margin-top: 20px;
  color: #f4f4f4;
  font-weight: bold;
}
.section-title:hover {
  color: #ffac3f;
  transform: scale(1.05);
  transition: 0.3s ease;
}
.card-container {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
}
footer {
  background-color: #1a1b1c;
  color: #c5cbe3;
  padding: 20px 0;
  margin-top: 20px;
  text-align: center;
}
</style>