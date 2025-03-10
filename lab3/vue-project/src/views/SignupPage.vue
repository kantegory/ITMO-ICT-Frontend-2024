<template>
  <div class="login-container">
    <h1 class="mt-5">Регистрация</h1>
    <button @click="toggleTheme" class="btn btn-primary">Переключить тему</button>
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
        <input type="tel" id="telephone" v-model="telephone" class="form-control" placeholder="Введите телефон (например, +79991234567)" required pattern="^\+?\d{10,15}$">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import api from '@/services/api';

export default {
  name: 'SignupPage',
  setup() {
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const telephone = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const signup = async () => {
      if (password.value.length < 6) {
        errorMessage.value = 'Пароль должен быть не менее 6 символов!';
        return;
      }

      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(telephone.value)) {
        errorMessage.value = 'Введите корректный номер телефона!';
        return;
      }

      const newUser = {
        name: name.value,
        email: email.value,
        telephone: telephone.value,
        password: password.value,
      };

      try {
        const response = await api.register(newUser);
        alert('Регистрация успешна! ');
        router.push('/login');
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        errorMessage.value = 'Ошибка при регистрации. Попробуйте еще раз.';
      }
    };

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
