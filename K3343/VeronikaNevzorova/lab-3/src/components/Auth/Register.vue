<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4 border-0">
      <h2 class="text-center mb-4">Регистрация</h2>
      <form @submit.prevent="registerUser" class="register-form">
        <div class="mb-3">
          <label for="username" class="form-label">Имя пользователя</label>
          <input
              type="text"
              v-model="username"
              class="form-control"
              id="username"
              placeholder="Введите ваше имя"
              required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
              type="email"
              v-model="email"
              class="form-control"
              id="email"
              placeholder="Введите ваш email"
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
        <div class="mb-3">
          <label for="confirm-password" class="form-label">Подтвердите пароль</label>
          <input
              type="password"
              v-model="confirmPassword"
              class="form-control"
              id="confirm-password"
              placeholder="Подтвердите ваш пароль"
              required
          />
        </div>
        <div class="mb-4">
          <label class="form-label">Выберите вашу роль:</label>
          <div class="form-check">
            <input
                type="radio"
                id="role-user"
                value="user"
                v-model="role"
                class="form-check-input"
                required
            />
            <label for="role-user" class="form-check-label">Пользователь</label>
          </div>
          <div class="form-check">
            <input
                type="radio"
                id="role-employer"
                value="employer"
                v-model="role"
                class="form-check-input"
                required
            />
            <label for="role-employer" class="form-check-label">Работодатель</label>
          </div>
        </div>

        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary w-100">Зарегистрироваться</button>
      </form>
      <p class="text-center mt-4">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      errorMessage: ''
    };
  },
  methods: {
    registerUser() {
      this.errorMessage = '';

      if (!this.username || !this.email || !this.password || !this.confirmPassword || !this.role) {
        this.errorMessage = 'Пожалуйста, заполните все поля!';
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Пароли не совпадают!';
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];

      if (users.some(user => user.email === this.email)) {
        this.errorMessage = 'Пользователь с таким email уже зарегистрирован!';
        return;
      }

      users.push({
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      });
      localStorage.setItem('users', JSON.stringify(users));

      alert('Регистрация прошла успешно!');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

.card {
  border-radius: 10px;
  background-color: #f9f9f9;
}

h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

.form-control {
  border-radius: 5px;
}

.btn-primary {
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  background-color: #007bff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.alert {
  font-size: 0.9rem;
  margin-top: 15px;
}
</style>
