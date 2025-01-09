<template>
  <div class="alert alert-warning" role="alert">
    <h4 class="alert-heading">{{ title }}</h4>
    <p>{{ message }}</p>
    <hr />
    <p class="mb-0">Осталось внести последние штрихи и заполнить поле "Номер телефона"</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.alert-warning {
  border-radius: 3rem;
}
</style>
