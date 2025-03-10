<template>
  <div>
    <header>
      <nav>
        <div class="main">
          <router-link to="/">Бронь столиков Букин</router-link>
          <button @click="toggleTheme" class="btn btn-primary">Переключить тему</button>
        </div>
      </nav>
    </header>

    <main>
      <section id="restaurant-details">
        <div class="container">
          <h2 class="text-center mb-4">{{ restaurant.name }}</h2>
          <div class="row">
            <div class="col-md-6">
              <img :src="'http://localhost:5503' + restaurant.image" class="card-img-top" :alt="restaurant.name">
            </div>
            <div class="col-md-6">
              <p>{{ restaurant.description }}</p>
              <h3>Меню</h3>
              <ul>
                <li v-for="item in restaurant.menu" :key="item">{{ item }}</li>
              </ul>
              <p><strong>Часы работы:</strong> {{ restaurant.working_hours }}</p>
              <p><strong>Адрес:</strong> {{ restaurant.address }}</p>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookingModal">Забронировать столик</button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Модальное окно бронирования -->
    <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="bookingModalLabel">Бронирование столика</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitBooking">
              <div class="mb-3">
                <label for="date" class="form-label">Дата</label>
                <input type="date" v-model="booking.date" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="time" class="form-label">Время</label>
                <input type="time" v-model="booking.time" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="guests" class="form-label">Количество гостей</label>
                <input type="number" v-model="booking.guests" class="form-control" min="1" required>
              </div>
              <button type="submit" class="btn btn-primary">Забронировать</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import api from '@/services/api';

export default {
  name: 'RestaurantPage',
  setup() {
    const route = useRoute();
    const restaurant = ref({
      name: 'Загрузка...',
      image: 'images/loading.jpg',
      description: 'Загрузка информации о ресторане...',
      menu: ['Загрузка...'],
      working_hours: 'Загрузка...',
      address: 'Загрузка...',
    });
    const isBookingModalOpen = ref(false);
    const booking = ref({
      date: '',
      time: '',
      guests: 1,
    });

    // Загрузка данных ресторана
    const loadRestaurant = async () => {
      const restaurantId = route.params.id;
      try {
        const data = await api.getRestaurantById(restaurantId);
        restaurant.value = data;
      } catch (error) {
        console.error('Ошибка загрузки ресторана:', error);
      }
    };

    // Открытие модального окна для бронирования
    const openBookingModal = () => {
      console.log('Кнопка нажата');
      isBookingModalOpen.value = true;
    };

    // Закрытие модального окна
    const closeBookingModal = () => {
      isBookingModalOpen.value = false;
    };

    // Отправка данных бронирования
    const submitBooking = async () => {
      console.log('Загрузка бронирования...');

      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('Пожалуйста, войдите в систему для бронирования.');
        return;
      }
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id;

      const bookingData = {
        userId,
        restaurantId: route.params.id,
        date: booking.value.date,
        time: booking.value.time,
        guests: booking.value.guests,
      };

      try {
        console.log(booking.value);
        console.log('Отправка данных бронирования...');
        await api.bookTable(bookingData);
        alert('Бронирование успешно!');
        closeBookingModal();
      } catch (error) {
        console.error('Ошибка бронирования:', error);
        alert('Ошибка при бронировании. Попробуйте еще раз.');
      }
    };

    const { toggleTheme } = useTheme();

    // Загружаем данные о ресторане при монтировании компонента
    onMounted(() => {
      loadRestaurant();
    });

    return {
      restaurant,
      isBookingModalOpen,
      booking,
      openBookingModal,
      closeBookingModal,
      submitBooking,
      toggleTheme,
    };
  },
};
</script>

<style scoped>
@import '@/assets/css/theme-style.css';
</style>
