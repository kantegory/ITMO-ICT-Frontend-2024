<template>
  <div class="card">
    <img :src="imageSrc" class="card-img-top" :alt="imageAlt" />
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <h5 class="price">{{ time }}</h5>
      <a href="#" class="btn btn-primary">Посмотреть</a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: 'Restaurant image',
  },
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    default: 'Ближайшее время: 18:00',
  },
});
</script>

<style scoped>
.card {
  width: 100%;
  margin: 0 10px;
  border-radius: 6% / 5%;
}
.card-img-top {
  width: 94.5%;
  object-fit: cover;
  border-radius: 7% / 10%;
  margin: 10px;
}
</style>
