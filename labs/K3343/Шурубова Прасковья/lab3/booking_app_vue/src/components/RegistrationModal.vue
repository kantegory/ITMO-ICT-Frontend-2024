<template>
  <div class="modal fade" id="registration" tabindex="-1" aria-labelledby="registrationModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content profile-card">
        <div class="modal-header">
          <h2 class="modal-title" id="registrationModalLabel">Регистрация</h2>
          <button type="button" class="btn-close cross" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="registerUser">
            <div class="mb-3">
              <label for="register-username" class="form-label">Имя</label>
              <input v-model="user.username" type="text" class="form-control" id="register-username" required>
            </div>
            <div class="mb-3">
              <label for="register-surname" class="form-label">Фамилия</label>
              <input v-model="user.surname" type="text" class="form-control" id="register-surname" required>
            </div>
            <div class="mb-3">
              <label for="register-email" class="form-label">Электронная почта</label>
              <input v-model="user.email" type="email" class="form-control" id="register-email" required>
            </div>
            <div class="mb-3">
              <label for="register-password" class="form-label">Пароль</label>
              <input v-model="user.password" type="password" class="form-control" id="register-password" required>
            </div>
            <button type="submit" class="btn btn-outline-light button-reg">Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';

export default {
  data() {
    return {
      user: {
        username: '',
        surname: '',
        email: '',
        password: '',
        favorites: [],
        bookings: []
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        const data = await registerUser(this.user);
        localStorage.setItem('currentUser', JSON.stringify(data));
        window.location.reload();
      } catch (error) {
        console.error('Ошибка регистрации:', error);
      }
    }
  }
};
</script>


<style>
:root {
    --background-color: #F4E2DB;
    --text-color: #000000;
    --border: #F2D4CA;
    --header-color: #000000;
    --text-color-nav: #666666;
    --background-modal: #ffffff;
    --border-hover: #F2D4CA;
    --close-icon-hover-color: #ff0000;
    --back: #ffffff;
    --icon-url: url('photo/icon.png');
}

[data-theme="dark"] {
    --background-color: #000000;
    --text-color: #ffffff;
    --border: #ffffff;
    --header-color: #ffffff;
    --text-color-nav: #CCCCCC;
    --background-modal: #000000;
    --border-hover: #000000;
    --close-icon-hover-color: #ff5555;
    --back: #333333;
    --icon-url: url('photo/inverse.jpg');
}

@media (prefers-color-scheme: dark) {
    :root {
        --background-color: #000000;
        --text-color: #ffffff;
        --border: #ffffff;
        --header-color: #ffffff;
        --text-color-nav: #CCCCCC;
        --background-modal: #000000;
        --border-hover: #000000;
        --close-icon-hover-color: #ff5555;
        --back: #333333;
        --icon-url: url('photo/inverse.jpg');
    }
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
}

h2 {
    margin-bottom: 20px;
}

.theme-icon {
    width: 50px;
    height: 50px;
    background-image: var(--icon-url);
    background-size: cover;
    margin-right: 16px;
    display: inline-block;
}

.theme {
    background-color: var(--background-modal);
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.icon {
    vertical-align: middle;
    margin-right: 5px;
    fill: currentColor;
}

.icon-del {
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -5px;
    fill: currentColor;
}

.booking-history-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}



.location-btn{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 30px;
}

.reviews-list {
    margin-left: -30px;
}

#restaurant-reviews h3 {
    margin-bottom: 20px;
}

.dropdown-menu {
    width: fit-content;
    min-width: 100%;
    left: 0;
}

.dropdown-toggle::after {
    display: inline-block;
}

.close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
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

.cross {
    background-color: var(--text-color);
    mask: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3E%3Cpath fill="currentColor" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/%3E%3C/svg%3E') no-repeat;
    -webkit-mask: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3E%3Cpath fill="currentColor" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/%3E%3C/svg%3E') no-repeat;
    mask-size: contain;
    -webkit-mask-size: contain;
    mask-position: center;
    -webkit-mask-position: center;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    width: 2rem;
    height: 2rem;
}
.cross:hover {
    color: var(--close-icon-hover-color);
    opacity: 0.8;
}



.btn-custom {
    font-size: 0.8rem;
    padding: 0.75rem 1.25rem;
}

.btn-custom {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
}

@media (max-width: 768px) {
    .form-control {
        margin-bottom: 10px;
    }
}

.working-hours-separator {
    margin: 0 15px;
    display: inline-block;
}

html, body {
    height: 100%;
    margin: 0;
}

.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content {
    flex: 1;
}

.row-links {
    display: flex;
    justify-content: center;
}

@media (max-width: 768px) {
    .foot-menu {
        flex-direction: column;
    }
}

.close {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.5rem;
    cursor: pointer;
}

.close:focus {
    outline: none;
}

.button-uni, .button-reg{
    color: var(--text-color);
    background-color: transparent;
    border: 3px solid var(--border);
    border-radius: 10px;
    padding: 7px 16px;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button-uni:hover, .button-reg:hover {
    background-color: var(--border);
    color: #000000;
    box-shadow: 0 0 3px 2px rgba(209, 139, 121, 0.6);
}

.button-find {
    color: var(--text-color);
    background-color: transparent;
    border: 3px solid var(--border);
    border-radius: 10px;
    padding: 7px 16px;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button-find:hover {
    background-color: var(--border);
    color: #000000;
    box-shadow: 0 0 3px 2px rgba(209, 139, 121, 0.6);
}

.button-book {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    background-color: transparent;
    border: 3px solid var(--border);
    border-radius: 10px;
    padding: 7px 16px;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button-book:hover {
    background-color: var(--border);
    color: #000000;
}

.button-b {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    background-color: transparent;
    border: 3px solid var(--border);
    border-radius: 10px;
    padding: 7px 16px;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
    position: relative;
    margin-top: 20px;
    margin-left: 35px;
}

.button-b:hover{
    background-color: var(--border);
    color: #000000;
}

.button-book:active {
    border-color: #F2D4CA;
    box-shadow: 0 0 3px 2px rgba(209, 139, 121, 0.6);
}

.menu-gallery-container {
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    margin: 20px 0;
}

.menu-gallery {
    display: flex;
    overflow-x: scroll;
    scroll-behavior: smooth;
    gap: 10px;
    padding: 10px;
    scrollbar-width: none;
}

.menu-gallery::-webkit-scrollbar {
    display: none;
}

.menu-gallery img {
    max-width: 150px;
    height: auto;
    margin: 5px;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.menu-gallery img:hover {
    transform: scale(1.1);
}

.modal-body .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1050;
    user-select: none;
    transition: background-color 0.3s;
}

.modal-body .arrow:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.modal-body .left-arrow {
    left: -30px;
}

.modal-body .right-arrow {
    right: -30px;
}


.modal-content {
    border: none;
    background-color: var(--background-modal);
}

.modal-content-im {
    border: none;
    background-color: transparent;
}

.modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3;
    height: 100%;
    text-align: center;
}

.modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0;
}

.modal-im {
    width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
}

.button-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    margin: 20px 0;
}

button:focus {
    outline: 2px solid blue;
}

.dropdown-item.active {
    background-color: #000000;
}

</style>