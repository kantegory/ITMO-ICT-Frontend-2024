<template>
  <div class="container mt-5">
    <h1 class="mb-4">Поиск ресторанов</h1>
    <div class="row mb-3">
      <div class="col-md-3" v-for="field in fields" :key="field.id">
        <input
          type="text"
          class="form-control"
          :placeholder="field.placeholder"
          v-model="formData[field.id]"
          :id="field.id + '-input'"
        />
      </div>
    </div>
    <div class="d-flex justify-content-end mb-4">
      <button class="btn btn-outline-light button-find" @click="handleSearch">
        Поиск
      </button>
    </div>

    <div v-if="noResults" class="alert alert-warning">{{ noResults }}</div>
    <div v-else class="roww">
      <div
        v-for="restaurant in filteredRestaurants"
        :key="restaurant.id"
        class="restaurant-card col-12 col-md-6 col-lg-4"
      >
        <h5>{{ restaurant.name }}</h5>
        <p>Кухня: {{ restaurant.cuisine }}</p>
        <p>Расположение: {{ restaurant.details }}</p>
        <p>Цена: {{ restaurant.price }}</p>
        <button class="btn btn-outline-light button-book" @click="goToDetails(restaurant.id)">
          Подробнее
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAllRestaurants } from "@/api/restaurant";

export default {
  name: "Searchform",
  data() {
    return {
      formData: {
        cuisine: "",
        name: "",
        location: "",
        price: "",
      },
      fields: [
        { id: "cuisine", placeholder: "Кухня" },
        { id: "name", placeholder: "Название ресторана" },
        { id: "location", placeholder: "Станция метро/адрес" },
        { id: "price", placeholder: "Цена" },
      ],
      filteredRestaurants: [],
      noResults: "",
    };
  },
  methods: {
    async handleSearch() {
      const { cuisine, name, location, price } = this.formData;

      try {
        const restaurants = await fetchAllRestaurants();

        this.filteredRestaurants = restaurants.filter(restaurant => {
          return (
            (cuisine === "" || restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase())) &&
            (name === "" || restaurant.name.toLowerCase().includes(name.toLowerCase())) &&
            (location === "" || restaurant.station.toLowerCase().includes(location.toLowerCase()) || restaurant.details.toLowerCase().includes(location.toLowerCase())) &&
            (price === "" || (parseInt(price) && parseInt(restaurant.price) <= parseInt(price)))
          );
        });

        if (this.filteredRestaurants.length === 0) {
          this.noResults = "Не найдено ресторанов, соответствующих критериям.";
        } else {
          this.noResults = "";
        }
      } catch (error) {
        console.error("Ошибка при получении данных: ", error);
        alert("Не удалось загрузить список ресторанов.");
      }
    },
    goToDetails(restaurantId) {
      this.$router.push({ name: "RestaurantDetails", params: { id: restaurantId } });
    },
  },
};
</script>


<style>
:root {
    --background-color: #F4E2DB;
    --text-color: #000000;
    --border: #F2D4CA;
    --header-color: #000000;
    --text-color-nav: #666666;
    --background-modal: #ffffff;
    --border-hover: #F2D4CA;
    --close-icon-hover-color: #ff0000;
    --back: #ffffff;
    --icon-url: url('photo/icon.png');
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
}

h2 {
    margin-bottom: 20px;
}

.theme-icon {
    width: 50px;
    height: 50px;
    background-image: var(--icon-url);
    background-size: cover;
    margin-right: 16px;
    display: inline-block;
}

.navbar-text {
    position: relative;
    top: 5px;
    color: var(--header-color);
}



.colorful {
    color: var(--header-color);
}

.colorful:hover{
    color: var(--text-color-nav);
}

.theme {
    background-color: var(--background-modal);
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.icon {
    vertical-align: middle;
    margin-right: 5px;
    fill: currentColor;
}

.icon-del {
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -5px;
    fill: currentColor;
}

.navbar-brand {
    margin-left: 10px;
    font-family: 'Cormorant';
    font-size: 25px;
    font-style: italic;
    color: var(--text-color);
}

.booking-history-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.restaurant-card {
    max-width: 330px;
    padding: 15px;
    margin: 13px;
    border: 1px solid transparent;
    border-radius: 5px;
    background-color: var(--back);
}

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

.profile-card{
    background-color: var(--back);
}

.modal-content.profile-card {
    background-color: var(--back);
}

.location-btn{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 30px;
}

.reviews-list {
    margin-left: -30px;
}

#restaurant-reviews h3 {
    margin-bottom: 20px;
}

.dropdown-menu {
    width: fit-content;
    min-width: 100%;
    left: 0;
}

.roww {
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  gap: 29px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>