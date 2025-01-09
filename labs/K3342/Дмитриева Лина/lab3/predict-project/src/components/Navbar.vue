<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">🔮 Пророчества</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li v-for="link in links" :key="link.name" class="nav-item">
            <router-link class="nav-link" :to="link.path">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: "Вход", path: "/login" },
        { name: "Личный кабинет", path: "/profile" },
        { name: "Арканы", path: "/arcans" },
        { name: "Натальная карта", path: "/natal" },
        { name: "Матрица судьбы", path: "/destiny-matrix" },
        { name: "Совместимость", path: "/compatibility-matrix" },
        { name: "О сервисе", path: "/info" },
      ],
    };
  },
};
</script>
