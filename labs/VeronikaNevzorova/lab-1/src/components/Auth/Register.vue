<template>
  <div class="container mt-5">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label for="name" class="form-label">Имя</label>
        <input type="text" v-model="name" class="form-control" id="name" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Электронная почта</label>
        <input type="email" v-model="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Пароль</label>
        <input type="password" v-model="password" class="form-control" id="password" required />
      </div>
      <div class="mb-3">
        <label for="role" class="form-label">Роль</label>
        <select v-model="role" class="form-select" id="role" required>
          <option value="user">Соискатель</option>
          <option value="employer">Работодатель</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'user',
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post('/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
        });
        alert('Регистрация успешна! Теперь вы можете войти.');
        this.$router.push('/login');
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
        alert('Ошибка при регистрации');
      }
    },
  },
};
</script>