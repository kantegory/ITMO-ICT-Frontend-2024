<template>
  <div class="user-info">
    <h4 class="ms-2">Акаунт</h4>
    <div class="user-photo">
      <img src="../assets/image/user-photo.png" class="user-img-top" alt="Фото пользователя">
    </div>
    <div v-for="(field, key) in userDetails" :key="key" class="user-detail">
      <h6>{{ field.label }}</h6>
      <h4>{{ field.value }}</h4>
      <button class="btn btn-primary btn-sm" @click="onEdit(key)">Изменить</button>
    </div>
  </div>
</template>

<script setup>
const userDetails = {
  username: {
    label: "Имя пользователя:",
    value: "Всеволод",
  },
  email: {
    label: "Email:",
    value: "vllazebnyi@gmail.com",
  },
  password: {
    label: "Пароль:",
    value: "qwerTY$12&52",
  },
};

const onEdit = (key) => {
  console.log(`Редактировать ${key}`);
};
</script>

<style scoped>
.user-info {
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: .25rem;
  width: 30%;
  height: 710px;
}

.user-photo img {
  width: 100%;
  height: auto;
  border-radius: .25rem;
}

.user-detail {
  margin-top: 10px;
}

.user-detail button {
  margin-top: 5px;
  width: 100%;
}
</style>
