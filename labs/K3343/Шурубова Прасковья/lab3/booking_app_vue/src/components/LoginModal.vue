<template>
  <div class="modal fade" id="login" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content profile-card">
        <div class="modal-header">
          <h2 class="modal-title" id="loginModalLabel">Вход</h2>
          <button type="button" class="btn-close cross" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="loginUser">
            <div class="mb-3">
              <label for="login-username" class="form-label">Имя</label>
              <input type="text" class="form-control" v-model="username" required>
            </div>
            <div class="mb-3">
              <label for="login-password" class="form-label">Пароль</label>
              <input type="password" class="form-control" v-model="password" required>
            </div>
            <small
              v-if="loginError"
              class="text-danger d-block mt-3"
              style="text-align: center;">
              Неверный логин или пароль. Попробуйте снова или
              <button
                type="button"
                class="btn btn-link p-0 m-0 align-baseline"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#registration">
                зарегистрируйтесь
              </button>.
            </small>
            <button type="submit" class="btn btn-outline-light button-uni">Войти</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { loginUser } from '@/api/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
      loginError: false
    };
  },
  methods: {
    async loginUser() {
      try {
        const data = await loginUser({ username: this.username, password: this.password });
        if (data.length > 0) {
          localStorage.setItem('currentUser', JSON.stringify(data[0]));
          window.location.reload();
        } else {
          this.showLoginError();
        }
      } catch (error) {
        console.error('Ошибка входа:', error);
        this.showLoginError();
      }
    },
    showLoginError() {
      this.loginError = true;
    }
  }
};
</script>


<style>
small.text-danger {
  font-size: 0.9rem;
}

.btn-link {
  color: #660033;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}

.modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0;
}

.modal-content {
    border: none;
    background-color: var(--background-modal);
}

.form-control {
    border: 2px solid var(--border);
    transition: border-color 0.3s;
    width: 100%;
    max-width: 450px;
    height: 45px;
    padding: 10px;
}

.form-control:focus {
    border-color: var(--border-hover);
    color: #000000;
    outline: none;
}

.form-control:focus-visible {
    outline: none;
    color: #000000;
}
</style>