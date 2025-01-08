<template>
  <div class="container mt-5">
    <h1>Избранное</h1>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    <div v-else-if="favorites.length === 0" class="mt-4">
      <p>Ваши избранные рестораны пусты.</p>
    </div>
    <div class="row g-3 mt-4">
      <div
        v-for="(restaurant, index) in favorites"
        :key="index"
        class="favorite-card col-12 col-md-6 col-lg-4"
      >
        <h2>{{ restaurant.name }}</h2>
        <p>Кухня: {{ restaurant.cuisine }}</p>
        <p>Расположение: {{ restaurant.details }}</p>
        <button class="btn btn-outline-light button-det"
          @click="goToDetails(restaurant.id)">
          Подробнее
        </button>
        <button
          class="btn btn-danger button-del"
          @click="removeFromFavorites(restaurant.id)"
        >
          <svg class="icon-del icon-trash" width="20" height="20">
            <use :href="`/sprite.svg#icon-trash`"></use>
          </svg>
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserData, updateUserData } from '@/api/user';

export default {
  name: 'FavoriteHistory',
  data() {
    return {
      favorites: [],
      error: null,
    };
  },
  methods: {
    async loadFavorites() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        this.error = 'Пожалуйста, авторизуйтесь для просмотра избранных ресторанов.';
        return;
      }

      try {
        const user = await getUserData(currentUser.id);
        this.favorites = user.favorites || [];
        this.error = null;
      } catch (error) {
        this.error = 'Произошла ошибка при загрузке избранных ресторанов.';
      }
    },
    async removeFromFavorites(restaurantId) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        this.error = 'Пожалуйста, авторизуйтесь для удаления ресторана из избранного.';
        return;
      }

      try {
        const user = await getUserData(currentUser.id);

        const index = user.favorites.findIndex(restaurant => restaurant.id === restaurantId);
        if (index !== -1) {
          user.favorites.splice(index, 1);
          await updateUserData(currentUser.id, user);
          this.favorites = user.favorites;
          alert('Ресторан удален из избранного!');
        }
      } catch (error) {
        console.error('Ошибка при удалении из избранного:', error);
        alert('Произошла ошибка при удалении из избранного');
      }
    },
    goToDetails(restaurantId) {
      this.$router.push({ name: 'RestaurantDetails', params: { id: restaurantId } });
    },
  },
  mounted() {
    this.loadFavorites();
  },
};
</script>

<style>
.favorite-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-width: 350px;
    padding: 15px;
    margin: 10px;
    border: 1px solid transparent;
    border-radius: 5px;
    background-color: var(--back);
}

.favorite-card .btn {
    margin-right: 30px;
}
.button-del{
    color: var(--text-color);
    background-color: transparent;
    border: 3px solid #DC143C;
    border-radius: 10px;
    padding: 6px 14px;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button-del:hover {
    background-color: #DC143C;
    box-shadow: 0 0 3px 2px rgba(209, 139, 121, 0.6);
}

.button-det {
    color: var(--text-color);
    background-color: transparent;
    border: 3px solid var(--border);
    border-radius: 10px;
    padding: 7px 16px;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button-det:hover {
    background-color: var(--border);
    color: #000000;
    box-shadow: 0 0 3px 2px rgba(209, 139, 121, 0.6);
}
</style>
