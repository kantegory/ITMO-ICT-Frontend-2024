<template>
  <div>
    <header>
      <h2 class="text-center my-4">Search Recipes</h2>
    </header>

    <div class="search-container">
      <input v-model="searchQuery" placeholder="Search recipes..." class="form-control my-3" />
      <button @click="searchRecipes" class="btn btn-primary">Search</button>
    </div>

    <section class="recipe-cards mt-4">
      <div v-if="searchResults.length > 0">
        <div v-for="recipe in searchResults" :key="recipe.id" class="recipe-card" @click="goToRecipe(recipe.id)">
          <img :src="recipe.image" class="img-fluid" :alt="recipe.title">
          <h3>{{ recipe.title }}</h3>
          <p>{{ recipe.description }}</p>
        </div>
      </div>
      <div v-else>
        <p>No results found. Try searching for another recipe.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchQuery: "",
      searchResults: []
    };
  },
  methods: {
    searchRecipes() {
      // Здесь можно сделать запрос на сервер с поисковым запросом.
      // Для примера, будем фильтровать статичные данные.

      const allRecipes = [
        { id: 1, title: "Autumn Apple Pie", description: "A delicious autumn dessert.", image: "https://example.com/pie.jpg" },
        { id: 2, title: "Chocolate Cake", description: "Rich and moist chocolate cake.", image: "https://example.com/cake.jpg" },
        // Можно добавить больше рецептов для поиска
      ];

      this.searchResults = allRecipes.filter(recipe => recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    goToRecipe(recipeId) {
      this.$router.push({ name: 'RecipeDetails', params: { id: recipeId } });
    }
  }
};
</script>

<style scoped>
.search-container {
  width: 50%;
  margin: 0 auto;
}
.recipe-card {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-align: center;
}
</style>
