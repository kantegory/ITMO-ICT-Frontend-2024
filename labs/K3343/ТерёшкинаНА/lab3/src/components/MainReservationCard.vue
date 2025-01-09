<template>
  <div class="main-reservation-card">
    <div class="message-photo">
      <img :src="imageSrc" :alt="altText" />
    </div>
    <div class="message-info">
      <h4 href="#" class="message-title">{{ title }}</h4>
      <div class="stars">
        <label class="fa fa-star" v-for="n in stars" :key="n"></label>
      </div>
    </div>
    <div class="message-meta">
      <div>Дата: {{ date }}</div>
      <div>Кол-во людей: {{ people }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: 'Картинка бронирования',
  },
  title: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    default: 5,
  },
  date: {
    type: String,
    required: true,
  },
  people: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.main-reservation-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 2% / 20%;
  padding: 1rem;
  margin-bottom: 50px;
  background-color: #f8f9fa;
  width: 90%;
}
.message-photo {
  flex: 0 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 25% / 25%;
  overflow: hidden;
  margin-right: 1rem;
}
.message-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.message-info {
  flex-grow: 1;
  overflow: hidden;
  margin-right: 1rem;
}
.message-title {
  font-weight: bold;
  color: #000000;
}
.message-meta {
  text-align: right;
  font-size: 0.9rem;
}
</style>
