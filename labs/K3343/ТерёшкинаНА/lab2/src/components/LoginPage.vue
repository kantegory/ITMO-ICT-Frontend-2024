<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');

const router = useRouter();

const addBodyClass = () => {
  document.body.classList.add('login-page');
};

const removeBodyClass = () => {
  document.body.classList.remove('login-page');
};

// Обработка входа
const loginUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    const users = response.data;

    // Найти пользователя с указанными email и паролем
    const user = users.find(
        (user) => user.email === email.value && user.password === password.value
    );

    if (user) {
      alert(`Добро пожаловать, ${user.name}!`);

      router.push('/');
    } else {
      alert('Неверный Email или пароль.');
    }
  } catch (error) {
    console.error(error);
    alert('Произошла ошибка при обработке входа.');
  }
};

onMounted(addBodyClass);
onBeforeUnmount(removeBodyClass);
</script>

<template>
  <div class="wrapper">
    <div class="title">
      Вход
    </div>
    <form @submit.prevent="loginUser">
      <div class="field">
        <input type="email" v-model="email" required>
        <label>Почта</label>
      </div>
      <div class="field">
        <input type="password" v-model="password" required>
        <label>Пароль</label>
      </div>
      <div class="content">
        <div class="checkbox">
          <input type="checkbox" id="remember-me">
          <label for="remember-me">Запомнить меня</label>
        </div>
        <div class="pass-link">
          <a href="#">Забыли пароль?</a>
        </div>
      </div>
      <div class="field">
        <input type="submit" value="Войти">
      </div>
      <div class="signup-link">
        Нет аккаунта? <a href="/register">Зарегистрироваться</a>
      </div>
    </form>
  </div>
</template>

<style scoped>
::selection{
  background: #ffd441;
  color: #fff;
}
.wrapper{
  width: 380px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
}
.wrapper .title{
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  line-height: 100px;
  color: #fff;
  user-select: none;
  border-radius: 15px 15px 0 0;
  background: linear-gradient(-135deg, #ff9100, #ffd441, #f6ae02);
}
.wrapper form{
  padding: 10px 30px 50px 30px;
}
.wrapper form .field{
  height: 50px;
  width: 100%;
  margin-top: 20px;
  position: relative;
}
.wrapper form .field input{
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 17px;
  border: 1px solid lightgrey;
  border-radius: 25px;
  transition: all 0.3s ease;
  padding-left: 20px;
}
.wrapper form .field input:focus,
form .field input:valid{
  border-color: #ffd441;
}
.wrapper form .field label{
  position: absolute;
  top: 50%;
  left: 20px;
  color: #999999;
  font-weight: 400;
  font-size: 17px;
  pointer-events: none;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}
form .field input:focus ~ label,
form .field input:valid ~ label{
  top: 0%;
  font-size: 16px;
  color: #ff9100;
  background: #fff;
  transform: translateY(-50%);
}
form .content{
  display: flex;
  width: 100%;
  height: 50px;
  font-size: 16px;
  align-items: center;
  justify-content: space-around;
}
form .content .checkbox{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd441;
}

form .content input{
  width: 15px;
  height: 15px;
  background: red;
}
form .content label{
  color: #262626;
  user-select: none;
  padding-left: 5px;
}
form .field input[type="submit"]{
  color: #fff;
  border: none;
  padding-left: 0;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(-135deg, #ff9100, #ffd441, #f6ae02);
  transition: all 0.3s ease;
}
form .field input[type="submit"]:hover{
  transform: scale(1.05);
  transition: 0.3s ease;
}
form .field input[type="submit"]:active{
  transform: scale(0.95);
}
form .signup-link{
  color: #262626;
  margin-top: 35px;
  text-align: center;
}
form .pass-link a,
form .signup-link a{
  color: #f6ae02;
  text-decoration: none;
}
form .pass-link a:hover,
form .signup-link a:hover{
  text-decoration: underline;
}
</style>