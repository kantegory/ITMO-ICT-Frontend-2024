<template>
  <div class="container">
    <header class="text-center my-4">
      <h2 id="registerTitle">Register on Recipe App</h2>
    </header>

    <form class="col-md-6 mx-auto" @submit.prevent="handleRegister">
      <section class="mb-4">
        <p id="formDescription">
          Please provide your information to create an account on Recipe App.
        </p>
      </section>

      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input
          type="text"
          id="name"
          class="form-control"
          v-model="formData.name"
          placeholder="Enter your name"
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="formData.email"
          placeholder="Enter email"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="formData.password"
          placeholder="Enter password"
          required
        />
      </div>

      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          class="form-control"
          v-model="formData.confirmPassword"
          placeholder="Confirm password"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";

export default {
  name: "registerComponent",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async handleRegister() {
      const { name, email, password, confirmPassword } = this.formData;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

      const newUser = { name, email, password: hashedPassword };

      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          alert("Registration successful!");
          this.$router.push("/login"); // Redirect to login page
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during registration.");
      }
    },
  },
};
</script>

<style scoped>
/* Вставьте ваши стили */
</style>
