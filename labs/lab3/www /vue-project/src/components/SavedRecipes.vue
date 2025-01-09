<template>
    <div class="mt-4">
      <h2>Сохраненные рецепты</h2>
      <ul class="list-group">
        <li v-for="recipe in savedRecipes" :key="recipe.title" class="list-group-item">
          <img
            :src="recipe.img"
            :alt="recipe.title"
            style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;"
          />
          <span>{{ recipe.title }}</span>
          <a
            :href="`/recipe?title=${encodeURIComponent(recipe.title)}&img=${encodeURIComponent(recipe.img)}&description=${encodeURIComponent(recipe.description)}`"
            class="btn btn-recipe btn-sm float-end"
          >Посмотреть</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "SavedRecipes",
    data() {
      return {
        savedRecipes: JSON.parse(localStorage.getItem("savedRecipes")) || [],
      };
    },
  };
  </script>
  