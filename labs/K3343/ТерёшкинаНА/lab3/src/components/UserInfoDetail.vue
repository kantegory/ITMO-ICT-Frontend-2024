<template>
  <div class="user-detail">
    <h6>{{ label }}</h6>
    <h4>{{ value }}</h4>
    <a href="#" class="btn btn-primary">Изменить</a>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.user-detail {
  margin-top: 10px;
}
.user-detail button {
  margin-top: 5px;
  width: 100%;
}
</style>
