<template>
    <div class="recipe-details">
      <h1 class="recipe-title">Детали рецепта</h1>
      <div v-if="recipe" class="recipe-content">
        <img :src="recipe.image" alt="Изображение рецепта" class="recipe-image" />
        <p class="recipe-summary" v-html="recipe.summary"></p>
        <div class="recipe-info">
          <h3>Дополнительная информация:</h3>
          <p><strong>Время приготовления:</strong> {{ recipe.readyInMinutes }} минут</p>
          <p><strong>Количество порций:</strong> {{ recipe.servings }}</p>
        </div>
      </div>
      <div v-else class="loading">
        Загрузка рецепта...
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RecipeDetails",
    data() {
      return {
        recipe: null, 
      };
    },
    created() {
      const recipeId = this.$route.params.id; 
      this.fetchRecipe(recipeId);
    },
    methods: {
      async fetchRecipe(id) {
        try {
          const apiKey = "10b9c47f2de24cc4b057c7eee5afbce6"; 
          const response = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
          );
          const data = await response.json();
          this.recipe = data; 
        } catch (error) {
          console.error("Ошибка загрузки рецепта:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .recipe-details {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    font-family: "Poppins", sans-serif;
  }
  
  .recipe-title {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  
  .recipe-content {
    text-align: left;
  }
  
  .recipe-image {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  
  .recipe-summary {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
  }
  
  .recipe-info h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  .recipe-info p {
    font-size: 16px;
    color: #555;
  }
  
  .loading {
    font-size: 18px;
    font-weight: bold;
    color: #999;
  }
  </style>
  