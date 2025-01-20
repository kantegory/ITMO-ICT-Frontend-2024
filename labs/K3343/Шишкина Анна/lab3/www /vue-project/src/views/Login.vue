<template>
    <div class="container mt-5">
      <h2 class="text-center">Вход в систему</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Электронная почта</label>
          <input 
            type="email" 
            class="form-control" 
            id="email" 
            v-model="email" 
            required 
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль</label>
          <input 
            type="password" 
            class="form-control" 
            id="password" 
            v-model="password" 
            required 
          />
        </div>
        <button type="submit" class="btn btn-primary" id="login-btn">Войти</button>
        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
        <div class="mt-3">
          <router-link to="/register" style="color: #808080;">Зарегистрируйтесь</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>

  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            email: this.email,
            password: this.password,
          });

          console.log('Ответ сервера:', response);

          if (response.data.success) {
            console.log('Пользователь найден:', response.data.user);

            localStorage.setItem('user', JSON.stringify(response.data.user));

            this.$router.push('/personal-page');
          } else {
            this.errorMessage = 'Неправильный email или пароль';
          }
        } catch (error) {
          this.errorMessage = error.response?.data?.message || 'Ошибка при входе';
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
.container {
    max-width: 400px;
    margin: 50px auto; 
    padding: 20px;
    background-color: #f9f9f9; 
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    font-family: 'Poppins', sans-serif;
}

h2 {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #222; 
}

.form-label {
    font-size: 14px;
    font-weight: bold;
    color: #222; 
}

.form-control {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd; 
    border-radius: 4px;
    transition: border-color 0.3s ease;
}

.form-control:focus {
    border-color: #556B2F; 
    outline: none;
    box-shadow: 0 0 5px rgba(85, 107, 47, 0.25);
}

#login-btn {
    width: 100%; 
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #556B2F; 
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

#login-btn:hover {
    background-color: #90EE90; 
    border-color: #90EE90;
    color: #222;
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    font-size: 14px;
    padding: 10px;
    margin-top: 20px;
}

.mt-3 {
    margin-top: 20px;
    text-align: center;
}

.mt-3 a {
    color: #28a745; 
    font-size: 14px;
    text-decoration: none;
}

.mt-3 a:hover {
    color: #006400; 
    text-decoration: underline;
}

  </style>