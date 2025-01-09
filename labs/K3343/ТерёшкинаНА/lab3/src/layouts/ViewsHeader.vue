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
</style>
