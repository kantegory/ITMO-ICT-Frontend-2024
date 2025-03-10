<!-- src/views/MainPage.vue -->
<template>
  <div>
    <header>
      <div class="main">
        <button @click="logout" class="btn btn-primary">Выйти</button>
        <button @click="toggleTheme" class="btn btn-primary">Переключить тему</button>
        <div class="text-right mb-3">Здравствуйте, <strong>{{ user.name }}</strong>!</div>
      </div>
    </header>
    <main>
      <section id="search">
        <div class="main-container">
          <h2 class="text-center mb-4">Поиск ресторана</h2>
          <form @submit.prevent="searchRestaurants">
            <div class="form-row">
              <div class="col-md-4">
                <label for="cuisineSelect">Кухня</label>
                <select class="form-control" v-model="cuisine">
                  <option value="">Все кухни</option>
                  <option value="итальянская">Итальянская</option>
                  <option value="японская">Японская</option>
                  <option value="русская">Русская</option>
                  <option value="мексиканская">Мексиканская</option>
                </select>
              </div>
              <div class="col-md-4">
                <label for="locationSelect">Город</label>
                <select class="form-control" v-model="city">
                  <option value="">Все города</option>
                  <option value="Москва">Москва</option>
                  <option value="Санкт-Петербург">Санкт-Петербург</option>
                  <option value="Казань">Казань</option>
                </select>
              </div>
              <div class="col-md-4">
                <label for="priceSelect">Цена</label>
                <select class="form-control" v-model="price">
                  <option value="">Любая цена</option>
                  <option value="1000">До 1000 руб.</option>
                  <option value="2000">До 2000 руб.</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Найти</button>
          </form>
        </div>
      </section>
      <section id="restaurants">
        <div class="container">
          <h2 class="text-center mb-4">Результаты поиска</h2>
          <div class="row">
            <RestaurantCard
              v-for="restaurant in filteredRestaurants"
              :key="restaurant.id"
              :restaurant="restaurant"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import axios from 'axios';
import RestaurantCard from '@/components/RestaurantCard.vue';

const API_URL = 'http://localhost:5503'; // Ваш API сервер

export default {
  name: 'MainPage',
  components: {
    RestaurantCard,
  },
  setup() {
    const router = useRouter();
    const user = ref(JSON.parse(localStorage.getItem('user')) || {});
    const cuisine = ref('');
    const city = ref('');
    const price = ref('');
    const restaurants = ref([]);

    // Функция для загрузки ресторанов
    const loadRestaurants = async () => {
      try {
        const response = await axios.get(`${API_URL}/restaurants`);
        restaurants.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке ресторанов:', error);
      }
    };

    // Фильтрация ресторанов на основе критериев поиска
    const filteredRestaurants = computed(() => {
      return restaurants.value.filter(r =>
        (cuisine.value === '' || r.cuisine === cuisine.value) &&
        (city.value === '' || r.city === city.value) &&
        (price.value === '' || r.price <= parseInt(price.value))
      );
    });

    // Поиск ресторанов по выбранным фильтрам
    const searchRestaurants = async () => {
      try {
        const response = await axios.get(`${API_URL}/restaurants`, {
          params: {
            cuisine: cuisine.value,
            city: city.value,
            price: price.value,
          },
        });
        restaurants.value = response.data;
      } catch (error) {
        console.error('Ошибка при поиске ресторанов:', error);
      }
    };

    const logout = () => {
      localStorage.removeItem('user');
      router.push('/login');
    };

    const { toggleTheme } = useTheme();

    // Загрузить рестораны при первом рендере компонента
    loadRestaurants();

    return {
      user,
      cuisine,
      city,
      price,
      restaurants,
      filteredRestaurants,
      logout,
      toggleTheme,
      searchRestaurants,
    };
  },
};
</script>

<style scoped>
@import '@/assets/css/main-style.css';
@import '@/assets/css/theme-style.css';
</style>