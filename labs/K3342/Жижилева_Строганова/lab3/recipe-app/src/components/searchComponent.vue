<template>
  <div class="container">
    <header class="text-center my-4 d-flex justify-content-center align-items-center">
      <h1 class="me-2">Search for Recipes</h1>
      <svg class="icon" aria-hidden="true" style="width: 32px; height: 32px;">
        <use xlink:href="img/icons/sprite.svg#icon-recipe-book"></use>
      </svg>
    </header>

    <section>
      <form @submit.prevent="searchRecipes" class="row g-3 align-items-center mb-4">
        <div class="col-md-3">
          <input
            type="text"
            class="form-control"
            v-model="searchQuery"
            placeholder="Enter keywords"
            aria-label="Search recipes by keyword"
          />
        </div>
        <div class="col-md-3">
          <input
            type="text"
            class="form-control"
            v-model="ingredientQuery"
            placeholder="Enter ingredients"
            aria-label="Search recipes by ingredients"
          />
        </div>
        <div class="col-md-3">
          <select
            class="form-select"
            v-model="dishType"
            aria-label="Select a dish type"
          >
            <option value="">Dish Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div class="col-md-3">
          <button type="submit" class="btn btn-primary w-100">
            Search
          </button>
        </div>
      </form>
    </section>

    <section>
      <div
        v-if="recipes.length"
        class="row"
        id="recipesContainer"
        role="region"
        aria-live="polite"
      >
        <div
          v-for="recipe in recipes"
          :key="recipe.id"
          class="col-md-4 mb-4"
        >
          <div class="card h-100">
            <img
              :src="recipe.image"
              class="card-img-top"
              :alt="recipe.title"
            />
            <div class="card-body">
              <h5 class="card-title">{{ recipe.title }}</h5>
              <button
                class="btn btn-primary w-100"
                @click="viewRecipe(recipe.id)"
              >
                View Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
      <p v-else-if="isSearching" class="text-center">Loading recipes...</p>
      <p v-else class="text-center">No recipes found. Try adjusting your search.</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      ingredientQuery: "",
      dishType: "",
      recipes: [],
      isSearching: false,
    };
  },
  methods: {
    async searchRecipes() {
      this.isSearching = true;
      this.recipes = [];
      try {
        const apiKey = "YOUR_SPOONACULAR_API_KEY";
        const baseUrl = "https://api.spoonacular.com/recipes/complexSearch";
        const params = new URLSearchParams({
          query: this.searchQuery,
          includeIngredients: this.ingredientQuery,
          type: this.dishType,
          number: 12, // Number of recipes to fetch
          apiKey,
        });

        const response = await fetch(`${baseUrl}?${params.toString()}`);
        const data = await response.json();
        this.recipes = data.results || [];
      } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Failed to fetch recipes. Please try again later.");
      } finally {
        this.isSearching = false;
      }
    },
    viewRecipe(recipeId) {
      window.location.href = `recipe.html?recipeId=${recipeId}`;
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
}
.card-img-top {
  border-radius: 8px 8px 0 0;
}
</style>
