// src/composables/useUser.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

export function useUser() {
  const user = ref(JSON.parse(localStorage.getItem('user')) || {});
  const bookings = ref([]);
  const router = useRouter();

  // Функция для загрузки данных профиля и бронирований
  const loadProfile = async () => {
    if (!user.value || !user.value.id) {
      alert('Вы не авторизованы!');
      router.push('/login');
      return;
    }

    try {
      const response = await api.getUserBookings(user.value.id);
      if (Array.isArray(response)) {
        bookings.value = response.map(booking => ({
          ...booking,
          restaurantName: booking.restaurantName || 'Неизвестно',
          status: booking.status || 'Ожидает подтверждения'
        }));
      } else {
        console.error('Ошибка: неожиданный формат данных', response);
        bookings.value = [];
      }
    } catch (error) {
      console.error('Ошибка загрузки бронирований:', error);
    }
  };

  // Функция для выхода из аккаунта
  const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return {
    user,
    bookings,
    loadProfile,
    logout
  };
}
