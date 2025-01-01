<template>
  <main class="container fade-in">
    <h2 class="text-center my-4" id="loginTitle">Login to Recipe App</h2>

    <form class="col-md-6 mx-auto" @submit.prevent="handleSubmit" aria-labelledby="loginTitle" aria-describedby="loginFormDesc">
      <p id="loginFormDesc" class="visually-hidden">Please enter your email and password to log in to the Recipe App.</p>

      <!-- Email Field -->
      <div class="form-group mb-3">
        <label for="email" class="form-label">Email</label>
        <div class="input-group">
          <span class="input-group-text"><i class="fas fa-envelope" aria-hidden="true"></i></span>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Username"
            v-model="email"
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>

      <!-- Password Field -->
      <div class="form-group mb-3">
        <label for="password" class="form-label">Password</label>
        <div class="input-group">
          <span class="input-group-text"><i class="fas fa-lock" aria-hidden="true"></i></span>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter password"
            v-model="password"
            required
            aria-describedby="passwordHelp"
          />
        </div>
        <div id="passwordHelp" class="form-text">Make sure your password is secure and at least 8 characters long.</div>
      </div>

      <!-- Submit Button -->
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary w-100" aria-label="Submit login form">Login</button>
      </div>

      <!-- Registration Link -->
      <div class="mt-3 text-center">
        <router-link to="/register" class="d-block" aria-label="Register for a new account">Don't have an account? Register here</router-link>
      </div>
    </form>
  </main>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  name: 'log_in',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleSubmit() {
      const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Base64);

      try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        const user = users.find(user => user.email === this.email && user.password === hashedPassword);

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push('/profile');
        } else {
          alert('Invalid username or password');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
  mounted() {
    document.querySelector('.fade-in').style.opacity = 1;
  }
};
</script>

<style scoped>
body.light-theme {
  background-color: #ffffff;
  color: #000000;
}
body.dark-theme {
  background-color: #000000;
  color: #ffffff;
}
</style>
