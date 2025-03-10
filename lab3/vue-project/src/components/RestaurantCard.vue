<!-- src/components/RestaurantCard.vue -->
<template>
  <div class="col-md-4 mb-4">
    <div class="card">
      <img :src="restaurant.image" class="card-img-top" :alt="restaurant.name">
      <div class="card-body">
        <h5 class="card-title">{{ restaurant.name }}</h5>
        <p class="card-text">{{ restaurant.cuisine }} кухня, {{ restaurant.city }}, Средний чек: {{ restaurant.price }} руб.</p>
        <router-link :to="`/restaurant/${restaurant.id}`" class="btn btn-primary">Узнать больше</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
@import '@/assets/css/main-style.css';
@import '@/assets/css/theme-style.css';
</style>