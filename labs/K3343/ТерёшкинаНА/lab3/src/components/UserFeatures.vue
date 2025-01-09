<template>
  <div class="features">
    <UserAlert title="Отлично!" message="Спасибо за регистрацию! Мы рады видеть Вас на нашем сайте. С нашей помощью Вы можете выбрать любой ресторан и забронировать в нем столик." />
    <h4 class="ms">Характеристики пользователя</h4>
    <div class="card">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Посещено заведений: {{ visitedPlaces }}</li>
        <li class="list-group-item">Количество предстоящих броней: {{ upcomingReservations }}</li>
        <li class="list-group-item">Ваше любимое место: {{ favoritePlace }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import UserAlert from '@/components/UserAlert.vue';

defineProps({
  visitedPlaces: {
    type: Number,
    required: true,
  },
  upcomingReservations: {
    type: Number,
    required: true,
  },
  favoritePlace: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.features {
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 3rem;
  width: 65%;
}
</style>
