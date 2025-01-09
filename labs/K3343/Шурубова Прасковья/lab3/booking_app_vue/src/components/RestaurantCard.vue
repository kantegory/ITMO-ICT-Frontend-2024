<template>
  <div class="restaurant-card col-12 col-md-6 col-lg-4">
    <h5>{{ restaurant.name }}</h5>
    <p>Кухня: {{ restaurant.cuisine }}</p>
    <p>Расположение: {{ restaurant.details }}</p>
    <p>Цена: {{ restaurant.price }}</p>
    <button class="btn btn-outline-light" @click="goToDetails">
      Подробнее
    </button>
  </div>
</template>

<script>
export default {
  name: "RestaurantCard",
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToDetails() {
      this.$router.push({ name: "RestaurantDetails", params: { id: this.restaurant.id } });
    },
  },
};
</script>

<style scoped>
.restaurant-card {
  max-width: 330px;
  padding: 15px;
  margin: 13px;
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: var(--back);
}
</style>
