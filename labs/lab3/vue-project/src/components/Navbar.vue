<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">Бронь столиков Букин</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Переключить навигацию">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/account">
              <!-- Иконка для аккаунта -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              Аккаунт
            </router-link>
          </li>
          <li v-if="!user.name" class="nav-item">
            <router-link class="nav-link" to="/login">
              <!-- Иконка для входа -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path d="M10 17l5-5-5-5v4H3v2h7v4z"/>
                <path d="M14 2v2h6v14h-6v2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-8z"/>
              </svg>
              Вход
            </router-link>
          </li>
          <li v-if="!user.name" class="nav-item">
            <router-link class="nav-link" to="/signup">Регистрация</router-link>
          </li>
          <li v-if="user.name" class="nav-item">
            <button @click="logout" class="btn btn-outline-light mr-2">
              <!-- Иконка для выхода -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path d="M10 17l5-5-5-5v4H3v2h7v4z"/>
                <path d="M14 2v2h6v14h-6v2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-8z"/>
              </svg>
              Выйти
            </button>
          </li>
          <li class="nav-item">
            <button @click="toggleTheme" class="btn btn-outline-light">Тема</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme'; // Импортируем функцию переключения темы

export default {
  setup() {
    const router = useRouter();
    const user = ref(JSON.parse(localStorage.getItem('user')) || {});
    const { toggleTheme } = useTheme(); // Получаем функцию toggleTheme

    const logout = () => {
      localStorage.removeItem('user');
      router.push('/login');
    };

    return { user, logout, toggleTheme }; // Добавляем toggleTheme в return
  }
};
</script>

<style scoped>
/* Убираем рамку и стили для кнопок */
.navbar-nav .nav-link, .nav-item .btn {
  border: none; /* Убираем рамку */
  padding: 0.5rem 1rem; /* Отступы для кнопок */
  display: flex;
  align-items: center;
}

.nav-item .btn:hover, .navbar-nav .nav-link:hover {
  background-color: #444; /* Изменение фона при наведении */
}
</style>
