<template>
  <div class="container mt-5">
    <h2 class="text-center">Регистрация</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Имя</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="form.name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Электронная почта</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="form.email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Пароль</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="form.password"
          required
        />
      </div>
      <div class="mb-3">
        <label for="confirm-password" class="form-label">Подтверждение пароля</label>
        <input
          type="password"
          class="form-control"
          id="confirm-password"
          v-model="form.confirmPassword"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
      <div class="mt-3">
        <router-link to="/login" style="color: #808080;">Войти</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      if (this.form.password !== this.form.confirmPassword) {
        alert("Пароли не совпадают");
        return;
      }

      const user = {
        username: this.form.name,
        email: this.form.email,
        password: this.form.password,
      };

      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          alert("Регистрация прошла успешно");
          this.$router.push("/login");
        } else {
          const errorData = await response.json();
          alert(`Ошибка регистрации: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при регистрации");
      }
    },
  },
};
</script>

<style>
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

button[type="submit"] {
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

button[type="submit"]:hover {
    background-color: #90EE90;
    border-color: #90EE90;
    color: #222;
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