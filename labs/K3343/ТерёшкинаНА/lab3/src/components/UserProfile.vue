<template>
  <div class="user-info">
    <h4 class="ms-2">Аккаунт</h4>
    <div class="user-photo">
      <img :src="photoUrl" class="user-img-top" alt="Профиль пользователя" />
      <a href="#" class="btn btn-primary">Изменить</a>
    </div>
    <UserInfoDetail label="Имя пользователя:" :value="userName" />
    <UserInfoDetail label="Email:" :value="userEmail" />
    <UserInfoDetail label="Пароль:" :value="userPassword" />
    <UserInfoDetail label="Номер телефона:" :value="userPhone" />
  </div>
</template>

<script setup>
import UserInfoDetail from '@/components/UserInfoDetail.vue';

defineProps({
  photoUrl: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.user-info {
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 3rem;
  width: 30%;
}
.user-photo img {
  width: 100%;
  height: auto;
  border-radius: 4rem;
}
</style>
