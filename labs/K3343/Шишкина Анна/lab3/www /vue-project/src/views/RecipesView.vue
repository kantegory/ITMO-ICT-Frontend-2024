<template>
    <div>
      <Header />
      <div id="recipes-page">
        <h1 class="page-title">Список рецептов</h1>
        <div class="filters-container">
          <div class="filter-section">
            <h5>Выберите типы блюд:</h5>
            <button
              id="toggle-type-btn"
              class="btn btn-secondary mb-2"
              @click="toggleTypeCheckboxes"
            >
              {{ showTypeCheckboxes ? "Скрыть типы блюд" : "Показать типы блюд" }}
            </button>
            <div id="type-checkboxes" v-show="showTypeCheckboxes">
              <label
                v-for="type in dishTypes"
                :key="type.value"
                class="filter-label"
              >
                <input
                  type="checkbox"
                  :value="type.value"
                  v-model="selectedTypes"
                  @change="filterRecipes"
                />
                {{ type.label }}
              </label>
            </div>
          </div>
          <div class="search-section">
            <SearchForm @search="handleSearch" />
          </div>
        </div>
        <div class="recipe-grid">
          <div v-if="filteredRecipes[0]" class="card large-card">
            <img :src="filteredRecipes[0].image" class="card-img" alt="Изображение рецепта" />
            <div class="card-body">
              <h3 class="card-title">{{ filteredRecipes[0].title }}</h3>
              <p class="card-description" v-html="filteredRecipes[0].summary"></p>
              <router-link
                :to="{ name: 'RecipeDetails', params: { id: filteredRecipes[0].id } }"
                class="card-button"
              >
                Подробнее
              </router-link>
            </div>
          </div>
          <div
            v-for="(recipe, index) in filteredRecipes.slice(1, 4)"
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
          <div
            v-for="(recipe, index) in filteredRecipes.slice(4, 8)"
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
      </div>
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import SearchForm from "@/components/recipes/SearchForm.vue";
  
  export default {
    name: "RecipesView",
    components: {
      Header,
      SearchForm,
    },
    data() {
      return {
        recipes: [],
        searchQuery: "",
        showTypeCheckboxes: false,
        selectedTypes: [],
        dishTypes: [
          { value: "lunch", label: "Обед" },
          { value: "main course", label: "Основное блюдо" },
          { value: "main dish", label: "Горячее" },
          { value: "dinner", label: "Ужин" },
          { value: "antipasti", label: "Антипасти" },
          { value: "soup", label: "Суп" },
          { value: "starter", label: "Закуска" },
          { value: "snack", label: "Снэк" },
          { value: "appetizer", label: "Аппетайзер" },
          { value: "antipasto", label: "Антипасто" },
          { value: "condiment", label: "Приправа" },
          { value: "dip", label: "Соус для макания" },
          { value: "sauce", label: "Соус" },
          { value: "spread", label: "Паста для намазывания" },
          { value: "dessert", label: "Десерт" },
        ],
      };
    },
    computed: {
      filteredRecipes() {
        let filtered = this.recipes;
        if (this.selectedTypes.length) {
          filtered = filtered.filter((recipe) =>
            this.selectedTypes.some((type) =>
              recipe.dishTypes ? recipe.dishTypes.includes(type) : false
            )
          );
        }
        if (this.searchQuery) {
          filtered = filtered.filter((recipe) =>
            recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        return filtered;
      },
    },
    methods: {
      toggleTypeCheckboxes() {
        this.showTypeCheckboxes = !this.showTypeCheckboxes;
      },
      handleSearch(query) {
        this.searchQuery = query;
      },
    },
    mounted() {
      const recipeIds = [715538, 715438, 715338, 715736, 713538, 716429, 715676, 675676];
      const apiKey = "10b9c47f2de24cc4b057c7eee5afbce6";
      const fetchRecipes = recipeIds.map((id) =>
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
          .then((response) => response.json())
      );
      Promise.all(fetchRecipes)
        .then((data) => {
          this.recipes = data;
        })
        .catch((error) => {
          console.error("Ошибка загрузки рецептов:", error);
        });
    },
  };
  </script>
  
  <style scoped>
  #recipes-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .page-title {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  
  .filters-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .filter-section {
    flex: 1;
  }
  
  .filter-section h5 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
  }
  
  #toggle-type-btn {
    font-size: 16px;
    padding: 10px 20px;
    background-color: #6c757d;
    color: #fff;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  #toggle-type-btn:hover {
    background-color: #5a6268;
  }
  
  .search-section {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  
  .search-section input {
    width: 300px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .search-section button {
    margin-left: 10px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-section button:hover {
    background-color: #218838;
  }
  
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
  