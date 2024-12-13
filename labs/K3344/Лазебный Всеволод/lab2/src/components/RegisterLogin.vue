<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const name = ref('');
const email = ref('');
const password = ref('');
const loginEmail = ref('');
const loginPassword = ref('');

const router = useRouter();

const registerUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    const users = response.data;
    const emailExists = users.some(user => user.email === email.value);

    if (emailExists) {
      alert('Пользователь с такой почтой уже существует.');
      return;
    }

    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value
    };

    await axios.post('http://localhost:3000/users', newUser);
    alert('Пользователь успешно зарегистрирован!');

    name.value = '';
    email.value = '';
    password.value = '';
  } catch (error) {
    console.error(error);
    alert('Ошибка при регистрации.');
  }
};

const loginUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users', {
      params: {
        email: loginEmail.value,
        password: loginPassword.value
      }
    });

    if (response.data.length > 0) {
      const user = response.data[0];
      if (user.password === loginPassword.value) {
        alert(`Добро пожаловать, ${user.name}!`);
        router.push('/');
      } else {
        alert('Неверный пароль.');
      }
    } else {
      alert('Пользователь не найден.');
    }
  } catch (error) {
    console.error(error);
    alert('Ошибка при входе.');
  }
};

const addBodyClass = () => {
  document.body.classList.add('login-page');
};

const removeBodyClass = () => {
  document.body.classList.remove('login-page');
};

onMounted(addBodyClass);
onBeforeUnmount(removeBodyClass);
</script>

<template>
  <div class="main">
    <input type="checkbox" id="chk" class="chk" aria-hidden="true">

    <div class="signup">
      <form @submit.prevent="registerUser">
        <label for="chk" aria-hidden="true">Регистрация</label>
        <input type="text" v-model="name" placeholder="Имя" required autocomplete="name">
        <input type="email" v-model="email" placeholder="Почта" required autocomplete="email">
        <input type="password" v-model="password" placeholder="Пароль" required autocomplete="new-password">
        <button type="submit" id="submit">Регистрация</button>
      </form>
    </div>

    <div class="login">
      <form @submit.prevent="loginUser">
        <label for="chk" aria-hidden="true">Вход</label>
        <input type="email" v-model="loginEmail" placeholder="Почта" required>
        <input type="password" v-model="loginPassword" placeholder="Пароль" required>
        <button>Вход</button>
        <div class="social">
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-vk"></i></a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  background-image: url("../assets/image/main.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center; /* Исправлено */
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
}

.main{
  width: 350px;
  height: 500px;
  background: #212529;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.59);
}

.chk {
  display: none;
}

.signup{
  color: #fff;
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.signup label{
  margin-top: 30px;
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  font-weight: bold;
  cursor: pointer;
}

input{
  width: 60%;
  height: 45px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 30px auto;
  padding: 10px;
  border: none;
  outLine: none;
  border-radius: 5px;
}

button{
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #0d6cf9;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outLine: none;
  border: none;
  border-radius: 5px;
  transition: .2s ease-in;
  cursor: pointer;
}

button:hover{
  background: #0d44f7;
}

.login{
  height: 550px;
  background: #eee;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: 1s ease-in-out;
}

.login label{
  color: #0d6dfb;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  padding-top:10px;
  margin-top: 60px;
  font-weight: bold;
  cursor: pointer;
}

#chk:checked ~ .login{
  transform: translateY(-570px);
}

#chk:checked ~ .login label{
  transform: scale(1);
}

#chk:checked ~ .signup label{
  transform: scale(1);
  transition: 1s ease-in-out;
}

.social {
  text-align: center;
  margin-top: 40px;
}

.social-icon {
  color: #212529;
  font-size: 24px;
  margin: 0 10px;
  text-decoration: none;
}

.social-icon:hover {
  color: #0d6cf9;
}
</style>