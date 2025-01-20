<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Мой проект</a>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav  ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Главная</router-link>
          </li>
          <!-- Кнопки "Вход" и "Регистрация", отображаются только если пользователь не аутентифицирован -->
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/login">Вход</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/register">Регистрация</router-link>
          </li>

          <!-- Кнопка "Личный кабинет" для соискателей -->
          <li class="nav-item" v-if="isAuthenticated && user.role === 'user'">
            <router-link class="nav-link" to="/user/dashboard">Личный кабинет</router-link>
          </li>

          <!-- Кнопка "Кабинет работодателя" для работодателей -->
          <li class="nav-item" v-if="isAuthenticated && user.role === 'employer'">
            <router-link class="nav-link" to="/employer/dashboard">Кабинет работодателя</router-link>
          </li>

          <!-- Кнопка "Выйти", отображается только если пользователь аутентифицирован -->
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link" href="#" @click.prevent="logout">Выйти</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'; // Импортируем computed из Vue
import { useRouter } from 'vue-router'; // Импортируем useRouter


export default {
  setup() {
    const router = useRouter();

    const updateUserInfo = () => {
      user.value = JSON.parse(localStorage.getItem('user')) || {};
    };

    window.addEventListener('user-logged-in', updateUserInfo);
    window.addEventListener('user-logged-out', updateUserInfo);

    const isAuthenticated = computed(() => {
      return !!localStorage.getItem('token'); // Проверка аутентификации пользователя
    });

    const user = computed(() => {
      return JSON.parse(localStorage.getItem('user')) || {}; // Получение информации о пользователе
    });

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('user-logged-out'));
      router.push('/login');
    };

    return {
      isAuthenticated,
      user,
      logout,
    };
  },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
