<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold" to="/">HOMERENT</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/property-search"
              class="nav-link"
              aria-current="page"
            >
              Поиск
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/account" class="nav-link">
              Аккаунт
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/archive" class="nav-link">
              Архив
            </router-link>
          </li>
        </ul>

        <ThemeToggler />
      </div>
    </div>
  </nav>
</template>

<script>
import ThemeToggler from './ThemeToggler.vue'

export default {
  name: 'Navbar',
  components: {
    ThemeToggler
  }
}
</script>
