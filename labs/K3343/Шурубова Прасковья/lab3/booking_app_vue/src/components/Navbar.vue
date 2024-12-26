<template>
  <nav class="navbar navbar-expand-lg navbar-light theme">
    <router-link to="/" class="navbar-brand colorful">
      <svg class="theme-icon">
        <use :href="`/sprite.svg#icon-home`"></use>
      </svg>
      <span class="navbar-text">Столик, пожалуйста!</span>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Переключить навигацию"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto ps-3">
        <li class="nav-item colorful" v-if="!isAuthenticated">
          <a class="nav-link" href="#" @click.prevent="openModal('registration')">Регистрация</a>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <a class="nav-link" href="#" @click.prevent="openModal('login')">Вход</a>
        </li>
        <li class="nav-item colorful" v-if="isAuthenticated">
          <a class="nav-link" href="#" @click="logout">Выйти</a>
        </li>
        <li class="nav-item dropdown" v-if="isAuthenticated">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="profileDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Личный кабинет
          </a>
          <ul class="dropdown-menu" aria-labelledby="profileDropdown">
            <li><a class="dropdown-item" href="/profile">Профиль</a></li>
            <li><a class="dropdown-item" href="/booking-history">История заказов</a></li>
            <li><a class="dropdown-item" href="/favorite-history">Избранное</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>

  <RegistrationModal ref="registrationModal" :registerData="registerData" @register="submitRegistration" />
  <LoginModal ref="loginModal" :loginData="loginData" @login="submitLogin" />
</template>

<script>
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import RegistrationModal from './RegistrationModal.vue';
import { useModal } from "@/services/useModal";
import LoginModal from './LoginModal.vue';
import { registerUser, loginUser } from "@/api/auth";
import axios from 'axios';

export default {
  name: 'Navbar',
  components: {
    RegistrationModal,
    LoginModal,
  },
  data() {
    return {
      isAuthenticated: false,
      registerData: {
        username: '',
        surname: '',
        email: '',
        password: '',
      },
      loginData: {
        username: '',
        password: '',
      },
    };
  },
  created() {
    this.checkAuthStatus();
  },
  methods: {
    checkAuthStatus() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.isAuthenticated = !!currentUser && !!currentUser.id;
    },
    async submitRegistration() {
      try {
        const response = await registerUser(this.registerData);
        if (response.id) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.checkAuthStatus();
        } else {
          console.error('Ошибка регистрации: id не получен.');
        }
      } catch (error) {
        console.error('Ошибка регистрации:', error);
      }
    },
    async submitLogin() {
      try {
        const response = await loginUser(this.loginData);
        if (response.id) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.checkAuthStatus();
        } else {
          console.error('Ошибка входа: id не получен.');
        }
      } catch (error) {
        console.error('Ошибка входа:', error);
      }
    },
    logout() {
      localStorage.removeItem('currentUser');
      this.isAuthenticated = false;
      window.location.reload();
    },
    openModal(modalId) {
      const { openModal } = useModal();
      openModal(modalId);
    },
  },
};
</script>

<style>
.navbar-text {
    position: relative;
    top: 5px;
    color: var(--header-color);
}

.navbar-brand {
    margin-left: 10px;
    font-family: 'Cormorant';
    font-size: 25px;
    font-style: italic;
    color: var(--text-color);
}

.colorful {
    color: var(--header-color);
}

.colorful:hover{
    color: var(--text-color-nav);
}

</style>