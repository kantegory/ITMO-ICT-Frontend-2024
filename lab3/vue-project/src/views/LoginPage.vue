<template>
  <div class="login-container">
    <h1 class="mt-5">Вход</h1>
    <button @click="toggleTheme" class="btn btn-primary">Переключить тему</button>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Почта</label>
        <input type="email" id="email" v-model="email" required class="form-control" placeholder="Введите почту">
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" required class="form-control" placeholder="Введите пароль">
      </div>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
      <input type="submit" value="Войти" class="btn btn-primary">
    </form>
    <div class="no-account">
      <p>У меня нет аккаунта <router-link to="/signup">Регистрация</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import api from '@/services/api';

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const login = async () => {
      try {
        const user = await api.login(email.value, password.value);

        if (!user) {
          errorMessage.value = 'Неверный email или пароль!';
          return;
        }

        localStorage.setItem('user', JSON.stringify(user));
        router.push('/account');
      } catch (error) {
        console.error(error);
        errorMessage.value = 'Ошибка авторизации!';
      }
    };

    const { toggleTheme } = useTheme();

    return {
      email,
      password,
      errorMessage,
      login,
      toggleTheme,
    };
  },
};
</script>

<style scoped>
@import '@/assets/css/login-style.css';
@import '@/assets/css/theme-style.css';
</style>
