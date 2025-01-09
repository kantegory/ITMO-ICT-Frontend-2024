<template>
    <div class="recipe-grid">
      <!-- Первая крупная карточка -->
      <div v-if="recipes[0]" class="card large-card">
        <img :src="recipes[0].image" class="card-img" alt="Изображение рецепта" />
        <div class="card-body">
          <h3 class="card-title">{{ recipes[0].title }}</h3>
          <p class="card-description" v-html="recipes[0].summary"></p>
          <router-link
            :to="{ name: 'RecipeDetails', params: { id: recipes[0].id } }"
            class="card-button"
          >
            Подробнее
          </router-link>
        </div>
      </div>
  
      <!-- Средние карточки -->
      <div
        v-for="(recipe, index) in recipes.slice(1, 4)"
        :key="recipe.id"
        class="card medium-card"
      >
        <img :src="recipe.image" class="card-img" alt="Изображение рецепта" />
        <div class="card-body">
          <h4 class="card-title">{{ recipe.title }}</h4>
          <p class="card-description" v-html="recipe.summary"></p>
          <router-link
            :to="{ name: 'RecipeDetails', params: { id: recipe.id } }"
            class="card-button"
          >
            Подробнее
          </router-link>
        </div>
      </div>
  
      <!-- Маленькие карточки -->
      <div
        v-for="(recipe, index) in recipes.slice(4, 8)"
        :key="recipe.id"
        class="card small-card"
      >
        <img :src="recipe.image" class="card-img" alt="Изображение рецепта" />
        <div class="card-body">
          <h5 class="card-title">{{ recipe.title }}</h5>
          <router-link
            :to="{ name: 'RecipeDetails', params: { id: recipe.id } }"
            class="card-button"
          >
            Подробнее
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["recipes"],
  };
  </script>
  
  <style scoped>
  /* Сетка рецептов */
  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
  }
  
  .large-card {
    grid-column: 3 / 10;
  }
  
  .medium-card {
    grid-column: span 4;
  }
  
  .small-card {
    grid-column: span 3;
  }
  
  .card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
  
  .card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-body {
    padding: 15px;
    text-align: center;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  .card-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }
  
  .card-button {
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
  .card-button:hover {
    background-color: #218838;
  }
  </style>
  