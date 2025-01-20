<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Вход</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="mb-3">
        <label for="email" class="form-label">Электронная почта</label>
        <input
            type="email"
            v-model="email"
            class="form-control"
            id="email"
            placeholder="Введите вашу электронную почту"
            required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Пароль</label>
        <input
            type="password"
            v-model="password"
            class="form-control"
            id="password"
            placeholder="Введите ваш пароль"
            required
        />
      </div>

      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn btn-primary w-100">Войти</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const migrateData = () => {
      const allKeys = Object.keys(localStorage);
      const users = allKeys
          .filter((key) => key.includes('@'))
          .map((key) => JSON.parse(localStorage.getItem(key)));

      if (users.length > 0) {
        localStorage.setItem('users', JSON.stringify(users));
        allKeys.forEach((key) => {
          if (key.includes('@')) localStorage.removeItem(key);
        });
      }
    };

    const handleLogin = () => {
      errorMessage.value = '';

      try {
        migrateData();

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        console.log('Данные пользователей из localStorage:', storedUsers);

        const user = storedUsers.find(
            (u) =>
                u.email.toLowerCase() === email.value.trim().toLowerCase() &&
                u.password === password.value.trim()
        );

        if (!user) {
          errorMessage.value = 'Неверные учетные данные';
          return;
        }

        localStorage.setItem('role', user.role);
        localStorage.setItem('token', 'fake-token');
        window.dispatchEvent(new Event('user-logged-in'));

        // Перенаправляем в зависимости от роли
        if (user.role === 'user') {
          router.push('/user/dashboard');
        } else if (user.role === 'employer') {
          router.push('/employer/dashboard');
        } else {
          errorMessage.value = 'Неизвестная роль пользователя';
        }
      } catch (e) {
        errorMessage.value = 'Произошла ошибка. Попробуйте еще раз.';
        console.error('Ошибка логина:', e);
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

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.form-control {
  border-radius: 4px;
}

.btn-primary {
  font-size: 1rem;
  padding: 10px;
  border-radius: 4px;
}

.alert {
  font-size: 0.9rem;
  color: #f44336;
  background-color: #ffe5e5;
}

.container {
  padding: 20px;
}
</style>
