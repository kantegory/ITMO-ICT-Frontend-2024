<template>
  <div class="card-header">
    <h3>Create account</h3>
    <hr>
  </div>
  <div class="card-body">
    <form @submit.prevent="registerUser">
      <div class="w-75">
        <input
            type="text"
            v-model="name"
            class="form-control"
            placeholder="Name"
            required
        />
      </div>
      <div class="w-75">
        <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="Email"
            required
        />
      </div>
      <div class="w-75">
        <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Password"
            required
        />
      </div>
      <div class="w-75">
        <select v-model="gender" class="form-select" required>
          <option value="" disabled>Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="w-75">
        <input
            type="number"
            v-model="age"
            class="form-control"
            placeholder="Age"
            required
        />
      </div>
      <div class="w-75">
        <input
            type="number"
            v-model="startWeight"
            class="form-control"
            placeholder="Your current weight"
            required
          />
      </div>
      <div class="w-75">
          <input
            type="number"
            v-model="goalWeight"
            class="form-control"
            placeholder="Your goal weight"
            required
          />
      </div>
      <button type="submit" class="btn btn-green w-75" :disabled="isLoading"> {{ isLoading ? 'Registering...' : 'Registratition' }} </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const name = ref('');
const email = ref('');
const password = ref('');
const gender = ref('');
const age = ref(null);
const startWeight = ref(null);
const goalWeight = ref(null);
const isLoading = ref(false);

const resetForm = () => {
  name.value = '';
  email.value = '';
  password.value = '';
  gender.value = '';
  age.value = null;
  startWeight.value = null;
  goalWeight.value = null;
};

const registerUser = async () => {
  if (password.value.length < 6) {
    alert('The password must be at least 6 characters long.');
    return;
  }

  isLoading.value = true;

  try {
    const response = await axios.get('http://localhost:3000/users');
    const users = response.data;
    const emailExists = users.some(user => user.email === email.value);
    if (emailExists) {
      alert('User with such an email already exists.');
      return;
    }

    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
      gender: gender.value,
      age: age.value,
      startWeight: startWeight.value,
      goalWeight: goalWeight.value,
    };

    await axios.post('http://localhost:3000/users', newUser);
    alert('Registration is successful!');
    resetForm();
    window.location.href = '/';

  } catch (error) {
    console.error(error);
    alert('Error during registration.');
  } finally {
    isLoading.value = false;
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

select {
  margin-top: 7%;
  color: #333333;
}
</style>
