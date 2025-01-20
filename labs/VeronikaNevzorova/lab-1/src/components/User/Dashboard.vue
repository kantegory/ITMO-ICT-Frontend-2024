<template>
  <div class="container mt-5">
    <h2>Личный кабинет</h2>
    <div class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">{{ user.name }}</h5>
        <p class="card-text">Электронная почта: {{ user.email }}</p>
        <p class="card-text">Роль: {{ user.role }}</p>
        <button class="btn btn-secondary" @click="editProfile">Редактировать профиль</button>
      </div>
    </div>
    <h3 class="mt-4">Мои резюме</h3>
    <!-- Реализуйте отображение и управление резюме -->

    <!-- Модальное окно для редактирования профиля -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Редактировать профиль</h2>
        <form @submit.prevent="saveProfile">
          <div class="form-group">
            <label for="name">Имя</label>
            <input type="text" id="name" v-model="user.name" required />
          </div>
          <div class="form-group">
            <label for="email">Электронная почта</label>
            <input type="email" id="email" v-model="user.email" required />
          </div>
          <button type="submit" class="btn btn-primary">Сохранить изменения</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      showModal: false,
    };
  },
  methods: {
    editProfile() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    saveProfile() {
      localStorage.setItem('user', JSON.stringify(this.user));
      this.closeModal();
      alert('Профиль успешно обновлён!');
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user')) || {};
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>