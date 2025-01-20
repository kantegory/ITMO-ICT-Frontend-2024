<template>
    <div>
      <Header />
      <div class="container mt-5" id="chefs-content">
        <h2>Список кулинаров</h2>
        <form class="search-form" @submit.prevent="filterChefs">
          <input
            v-model="searchQuery"
            class="form-control search-input"
            type="search"
            placeholder="Поиск кулинара"
            aria-label="Search"
          />
          <button class="btn btn-search" type="submit">Поиск</button>
        </form>
        <div class="row">
          <div
            v-for="chef in filteredChefs"
            :key="chef.id"
            class="col-md-4 chef-card-container"
          >
            <div class="card">
              <img
                :src="chef.image"
                class="card-img-top"
                alt="Фотография кулинара"
              />
              <div class="card-body">
                <h5 class="card-title">{{ chef.name }}</h5>
                <p class="card-text">
                  <strong>Автор рецептов:</strong>
                  <span v-for="(recipe, index) in chef.recipes" :key="index">
                    <router-link
                      :to="{
                        name: 'RecipeDetails',
                        params: { id: recipe.id },
                        query: {
                          img: recipe.img,
                          title: recipe.title,
                          description: recipe.description,
                        },
                      }"
                      style="color: #28a745;"
                    >
                      {{ recipe.title }}
                    </router-link>
                    <span v-if="index < chef.recipes.length - 1">, </span>
                  </span>
                </p>
                <router-link
                  :to="{
                    name: 'ChefProfile',
                    params: { id: chef.id },
                    query: {
                      img: chef.image,
                      title: chef.name,
                      description: chef.recipes.map((r) => r.title).join(', '),
                    },
                  }"
                  class="btn btn-chef"
                >
                  Посмотреть профиль
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  
  export default {
    name: "ChefsView",
    components: {
      Header,
    },
    data() {
      return {
        searchQuery: "",
        chefs: [
          {
            id: 1,
            name: "Мария Иванова",
            image: "img/maria.jpeg",
            recipes: [
              {
                id: 101,
                img: "img/sinnabon.jpeg",
                title: "Синнабоны",
                description: "Краткое описание рецепта синнабонов",
              },
              {
                id: 102,
                img: "img/main.jpeg",
                title: "Томатная паста с индейкой",
                description: "Описание рецепта томатной пасты с индейкой",
              },
              {
                id: 103,
                img: "img/salad.jpeg",
                title: "Салат",
                description: "Краткое описание рецепта салата",
              },
            ],
          },
        ],
      };
    },
    computed: {
      filteredChefs() {
        if (!this.searchQuery) return this.chefs;
        return this.chefs.filter((chef) =>
          chef.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      filterChefs() {},
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin-left: 20px;
    margin-right: auto;
  }
  
  h2 {
    text-align: left;
    margin-bottom: 30px;
    font-weight: bold;
    padding-left: 20px;
  }
  
  .search-form {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    margin-bottom: 20px;
    align-items: center;
    padding-left: 20px;
  }
  
  .search-input {
    width: 250px;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s ease;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #28a745;
  }
  
  .btn-search {
    padding: 8px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-search:hover {
    background-color: #218838;
  }
  
  .chef-card-container {
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
  }
  
  .card {
    max-width: 300px;
    margin-bottom: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
  
  .card-img-top {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-body {
    padding: 15px;
    text-align: left;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  .card-text {
    font-size: 14px;
    margin-bottom: 10px;
    color: #666;
  }
  
  .btn-chef {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    width: 100%;
  }
  
  .btn-chef:hover {
    background-color: #218838;
  }
  </style>
  