<template>
  <div class="card-header">
    <h3>Welcome!</h3>
    <hr>
  </div>
  <div class="card-body">
    <form @submit.prevent="loginUser">
      <div class="w-75">
        <input
            type="email"
            v-model="loginEmail"
            class="form-control"
            placeholder="Email"
            required
            autocomplete="email"
        />
      </div>
      <div class="w-75">
        <input
            type="password"
            v-model="loginPassword"
            class="form-control"
            placeholder="Password"
            required
            autocomplete="current-password"
        />
      </div>
      <button type="submit" class="btn btn-green w-75">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const loginEmail = ref('');
const loginPassword = ref('');

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
        localStorage.setItem('user', JSON.stringify(user));
        alert(`You are welcome, ${user.name}!`);
        window.location.href = '/account';
      } else {
        alert('Incorrect password.');
      }
    } else {
      alert('User not found.');
    }
  } catch (error) {
    console.error(error);
    alert('Error logging in.');
  }
};
</script>

<style scoped>
.card-header {
  margin-top: 3%;
}

.card-body {
  background-color: #333333;
  color: #fff;
}

.btn-green {
  background-color: #1d7e33;
  border-radius: 10px;
  margin-top: 5%;
  color: white;
}

.btn-green:hover {
  background-color: #555555;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form input {
  padding: 2%;
  border-radius: 5px;
  margin-top: 7%;
  color: #333333;
}

</style>