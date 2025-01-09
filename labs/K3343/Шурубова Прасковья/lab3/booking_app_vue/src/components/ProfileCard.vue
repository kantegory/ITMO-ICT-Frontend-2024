<template>
  <div class="container mt-5">
    <h2 class="text-center">Профиль пользователя</h2>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 profile-card">
          <form @submit.prevent="saveProfile">
            <div class="form-group mb-4">
              <label for="register-surname">Фамилия</label>
              <input
                v-model="user.surname"
                type="text"
                class="form-control"
                id="register-surname"
                placeholder="Введите фамилию"
              />
            </div>
            <div class="form-group mb-4">
              <label for="register-username">Имя</label>
              <input
                v-model="user.username"
                type="text"
                class="form-control"
                id="register-username"
                placeholder="Введите имя"
              />
            </div>
            <div class="form-group mb-4">
              <label for="register-email">Почта</label>
              <input
                v-model="user.email"
                type="email"
                class="form-control"
                id="register-email"
                placeholder="Введите почту"
              />
            </div>
            <div class="form-group mb-4">
              <label for="register-password">Пароль</label>
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="register-password"
                placeholder="Введите пароль"
              />
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-outline-light button-save">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserData, updateUserData } from '@/api/user';

export default {
  name: "ProfileCard",
  data() {
    return {
      user: {
        username: '',
        surname: '',
        email: '',
        password: '',
      },
    };
  },
  mounted() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.user = { ...currentUser };
    }
  },
  methods: {
    async saveProfile() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      if (currentUser) {
        const userId = currentUser.id;
        const updatedUserData = { ...this.user };

        try {
          const updatedUserDataFromServer = await updateUserData(userId, updatedUserData);
          const updatedCurrentUser = {
            ...currentUser,
            ...updatedUserDataFromServer,
          };

          localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
          console.log('Профиль обновлен:', updatedUserDataFromServer);
        } catch (error) {
          console.error('Ошибка обновления профиля:', error);
        }
      }
    },
  },
};
</script>


<style scoped>
.profile-card {
  max-width: 500px;
  margin: auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
.profile-card{
    background-color: var(--back);
}

.modal-content.profile-card {
    background-color: var(--back);
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

.button-save{
    color: var(--text-color);
    background-color: transparent;
    border: 3px solid var(--border);
    border-radius: 10px;
    padding: 7px 16px;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button-save:hover {
    background-color: var(--border);
    color: #000000;
}
</style>
