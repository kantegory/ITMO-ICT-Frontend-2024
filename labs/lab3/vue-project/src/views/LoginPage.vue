<template>
  <div class="login-container">
    <h1 class="mt-5">Вход</h1>
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
import { useAuth } from '@/composables/useAuth';
import { useTheme } from '@/composables/useTheme';

export default {
  name: 'LoginPage',
  setup() {
    const { email, password, errorMessage, login } = useAuth();
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
