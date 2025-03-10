<template>
  <div class="account-container">
    <h1 class="text-center mb-4">Мой профиль</h1>
    <router-link to="/" class="btn btn-primary">На главную</router-link>
    <button @click="logout" class="btn btn-primary">Выйти</button>
    <button @click="toggleTheme" class="btn btn-primary">Переключить тему</button>

    <div class="account-info">
      <strong>Имя:</strong> {{ user.name || 'Неизвестно' }}<br>
      <strong>Почта:</strong> {{ user.email || 'Не указана' }}<br>
      <strong>Телефон:</strong> {{ user.telephone || 'Не указан' }}
    </div>

    <div class="booking-tables-history">
      <h2 class="text-center mb-4">История бронирований</h2>
      <ul v-if="bookings.length > 0">
        <li v-for="booking in bookings" :key="booking.id">
          <h3>{{ booking.date }}, {{ booking.time }}</h3>
          <p>Ресторан: <i>{{ booking.restaurantName || 'Неизвестно' }}</i></p>
          <p>Количество гостей: <i>{{ booking.guests }}</i></p>
          <p>Статус бронирования: <i>{{ booking.status || 'Ожидает подтверждения' }}</i></p>
        </li>
      </ul>
      <p v-else>У вас пока нет бронирований.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import api from '@/services/api';

export default {
  name: 'AccountPage',
  setup() {
    const router = useRouter();
    const user = ref(JSON.parse(localStorage.getItem('user')) || {});
    const bookings = ref([]);

    const loadProfile = async () => {
      if (!user.value || !user.value.id) {
        alert('Вы не авторизованы!');
        router.push('/login');
        return;
      }

      try {
    // Загружаем бронирования пользователя
    const bookingsResponse = await api.getUserBookings(user.value.id);
    console.log('Полученные бронирования:', bookingsResponse);

    // Загружаем список ресторанов
    const restaurantsResponse = await api.getRestaurants();
    console.log('Полученные рестораны:', restaurantsResponse);

    // Сопоставляем restaurantId с названием ресторана
    if (Array.isArray(bookingsResponse) && Array.isArray(restaurantsResponse)) {
      bookings.value = bookingsResponse.map(booking => {
        const restaurant = restaurantsResponse.find(r => r.id === booking.restaurantId);
        return {
          ...booking,
          restaurantName: restaurant ? restaurant.name : 'Неизвестно',
          status: booking.status || 'Ожидает подтверждения'
        };
      });
    } else {
      console.error('Ошибка: неожиданный формат данных', bookingsResponse);
      bookings.value = [];
    }
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
};

    const logout = () => {
      localStorage.removeItem('user');
      router.push('/login');
    };

    const { toggleTheme } = useTheme();

    onMounted(() => {
      loadProfile();
    });

    return {
      user,
      bookings,
      logout,
      toggleTheme,
    };
  },
};
</script>

<style scoped>
@import '@/assets/css/account-style.css';
@import '@/assets/css/theme-style.css';
</style>
