<template>
  <div class="container mt-5">
    <h2>Вход</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="email" class="form-label">Электронная почта</label>
        <input type="email" v-model="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Пароль</label>
        <input type="password" v-model="password" class="form-control" id="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Войти</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiLogin } from "@/mocks/mockServer.js";

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    // Обработчик логина
    const handleLogin = async () => {
      errorMessage.value = '';

      try {
        const response = await apiLogin(email.value, password.value);
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.dispatchEvent(new Event('user-logged-in'));


        if (response.data.user.role === 'user') {
          await router.push('/user/dashboard');
        } else if (response.data.user.role === 'employer') {
          await router.push('/employer/dashboard');
        }
      } catch (error) {
        console.error('Ошибка при входе:', error, error.stack);
        errorMessage.value = 'Неверные учетные данные';
      }
    };

    return {
      email,
      password,
      errorMessage,
      handleLogin,
    };
  },
};
</script>