<template>
  <main :style="backgroundStyle" class="fade-in">
    <div class="container">
      <h2 class="text-center my-4 text-#556B2F" id="loginTitle">Login to Recipe App</h2>
      <form
        class="form mx-auto bg-light p-4 rounded shadow"
        @submit.prevent="handleSubmit"
        aria-labelledby="loginTitle"
        aria-describedby="loginFormDesc"
      >
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
              placeholder="Enter your email"
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
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

export default {
  name: 'log_in',
  setup() {
    const email = ref('');
    const password = ref('');
    const {login} = useAuth();

    const handleSubmit = async () => {
      const result = await login(email.value, password.value);

      if (result.success) {
        alert('Login successful!');
        this.$router.push('/profile');
      } else {
        alert(result.message);
      }
    };

    const backgroundStyle = {
      background: `url('/blur.jpg') no-repeat center center`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '-1', // Фон на заднем плане
    };

    return {
      email,
      password,
      handleSubmit,
      backgroundStyle,
    };
  },
  mounted() {
    document.querySelector('.fade-in').style.opacity = 1;
  },
};
</script>

<style scoped>
.fade-in {
  transition: opacity 1s ease-in-out;
  opacity: 0;
}


</style>
