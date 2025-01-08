<template>
  <div class="container mt-5">
    <h1>История заказов</h1>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    <div v-else-if="bookingHistory.length === 0" class="mt-4">
      <p>У вас нет истории бронирований.</p>
    </div>
    <div class="row g-3 mt-4">
      <div v-for="(booking, index) in bookingHistory" :key="index" class="restaurant-card col-md-4">
        <div class="card-body">
          <p><strong>Место:</strong> {{ booking.restaurantName }}</p>
          <p><strong>Дата:</strong> {{ formatDate(booking.date) }}</p>
          <p><strong>Адрес:</strong> {{ booking.restaurantLocation }}</p>
          <p><strong>Количество человек:</strong> {{ booking.people }}</p>
          <p><strong>Имя:</strong> {{ booking.name }}</p>
          <p><strong>Телефон:</strong> {{ booking.phone }}</p>
          <p><strong>Email:</strong> {{ booking.email }}</p>
          <p><strong>Пожелания:</strong> {{ booking.comments }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserData } from '@/api/user';

export default {
  name: 'BookingHistory',
  data() {
    return {
      bookingHistory: [],
      error: null,
    };
  },
  methods: {
    async loadBookingHistory() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        this.error = 'Пожалуйста, авторизуйтесь для просмотра истории бронирований';
        return;
      }

      try {
        const user = await getUserData(currentUser.id);
        this.bookingHistory = user.bookings || [];
        this.error = null;
      } catch (error) {
        this.error = 'Произошла ошибка при загрузке истории бронирований';
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ru-RU');
    },
  },
  mounted() {
    this.loadBookingHistory();
  },
};
</script>


<style>
.card-body {
    color: var(--text-color);
    border-radius: 0 0 15px 15px;
}

.card-body p {
    margin: 4px 0;
    line-height: 1.2;
}

.restaurant-card {
    max-width: 330px;
    padding: 15px;
    margin: 13px;
    border: 1px solid transparent;
    border-radius: 5px;
    background-color: var(--back);
}
</style>