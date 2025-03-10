<template>
  <div class="login-container">
    <h1 class="mt-5">Регистрация</h1>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="name">Имя</label>
        <input type="text" id="name" v-model="name" class="form-control" placeholder="Введите имя" required>
      </div>
      <div class="form-group">
        <label for="email">Почта</label>
        <input type="email" id="email" v-model="email" class="form-control" placeholder="Введите почту" required>
      </div>
      <div class="form-group">
        <label for="telephone">Телефон</label>
        <input type="tel" id="telephone" v-model="telephone" class="form-control" placeholder="Введите телефон (например, +79991234567)" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" class="form-control" placeholder="Введите пароль (мин. 6 символов)" required>
      </div>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
      <input type="submit" value="Создать аккаунт" class="btn btn-primary">
    </form>
    <div class="no-account">
      <p>У меня уже есть аккаунт <router-link to="/login">Войти</router-link></p>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth';
import { useTheme } from '@/composables/useTheme';

export default {
  name: 'SignupPage',
  setup() {
    const { name, email, telephone, password, errorMessage, signup } = useAuth();
    const { toggleTheme } = useTheme();

    return {
      name,
      email,
      telephone,
      password,
      errorMessage,
      signup,
      toggleTheme,
    };
  },
};
</script>

<style scoped>
@import '@/assets/css/login-style.css';
@import '@/assets/css/theme-style.css';
</style>
