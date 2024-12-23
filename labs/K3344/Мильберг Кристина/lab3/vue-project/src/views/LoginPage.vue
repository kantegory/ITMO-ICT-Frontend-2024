<template>
  <div class="login-page">
    <h1 v-if="isRegistering">Регистрация</h1>
    <h1 v-else>Вход</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Введите имя пользователя"
        />
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Введите пароль"
        />
      </div>

      <button type="submit" v-if="!isRegistering">Войти</button>
      <button type="submit" v-else>Зарегистрироваться</button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>

    <p class="toggle">
      <span v-if="isRegistering">Уже есть аккаунт?
        <button @click="toggleMode">Войти</button>
      </span>
      <span v-else>Нет аккаунта?
        <button @click="toggleMode">Регистрация</button>
      </span>
    </p>
  </div>
</template>


<script>
import useApi from "@/composables/useApi";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      success: "",
      isRegistering: false,
    };
  },
  methods: {
    toggleMode() {
      this.isRegistering = !this.isRegistering;
      this.error = "";
      this.success = "";
      this.username = "";
      this.password = "";
    },

    async handleSubmit() {
      if (this.isRegistering) {
        await this.handleRegister();
      } else {
        await this.handleLogin();
      }
    },

    async handleLogin() {
      const api = useApi();
      try {
        const users = (await api.getUsers()).data;
        console.log("Полученные пользователи:", users);

        if (!this.username || !this.password) {
          this.error = "Введите имя пользователя и пароль.";
          return;
        }

        const user = users.find(
          (u) => u.username === this.username && u.password === this.password
        );

        if (user) {
          localStorage.setItem("token", user.token);
          this.$router.push("/profile");
        } else {
          this.error = "Неверное имя пользователя или пароль.";
        }
      } catch (error) {
        console.error("Ошибка при подключении к серверу:", error);
        this.error = "Ошибка подключения. Проверьте интернет.";
      }
    },

    async handleRegister() {
      const api = useApi();
      try {
        if (!this.username || !this.password) {
          this.error = "Введите имя пользователя и пароль.";
          return;
        }

        if (this.password.length < 5) {
          this.error = "Пароль должен содержать минимум 5 символов.";
          return;
        }

        const newUser = {
          username: this.username,
          password: this.password,
          token: `mock-token-${Date.now()}`,
        };

        await api.createUser(newUser); // Добавляем нового пользователя

        this.success = "Регистрация успешна! Теперь вы можете войти.";
        this.toggleMode();
      } catch (error) {
        console.error("Ошибка регистрации:", error);
        this.error = "Ошибка регистрации. Попробуйте позже.";
      }
    },
  },
};
</script>


<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #5c6bc0;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #3949ab;
}
.error {
  margin-top: 10px;
  color: red;
  font-size: 14px;
}
.success {
  margin-top: 10px;
  color: green;
  font-size: 14px;
}
.toggle {
  margin-top: 15px;
  text-align: center;
}
.toggle button {
  background: none;
  border: none;
  color: #5c6bc0;
  text-decoration: underline;
  cursor: pointer;
}
</style>
