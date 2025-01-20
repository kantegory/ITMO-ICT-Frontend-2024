<template>
    <div>
      <Header />
      <main class="main">
        <div class="container mt-4">
          <h1 class="text-center">{{ chef.title }}</h1>
          <img :src="chef.img" class="img-fluid" alt="Фотография кулинара" />
          <div class="mt-4" alt="Список рецептов">
            <h3>Автор блюд:</h3>
            <br />
            <p>{{ chef.description }}</p>
          </div>
  
          <div class="mt-4">
            <router-link to="/chefs" class="btn btn-back-to-chefs">Вернуться к списку кулинаров</router-link>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  
  export default {
    name: "ChefProfile",
    components: {
      Header,
    },
    data() {
      return {
        chef: {
          img: "img/default.jpg", 
          title: "Имя Кулинара", 
          description: "Здесь будет полный список рецептов кулинара.", 
        },
      };
    },
    mounted() {
      const params = new URLSearchParams(this.$route.query);
      this.chef.img = params.get("img") || "img/default.jpg";
      this.chef.title = params.get("title") || "Имя Кулинара";
      this.chef.description = params.get("description") || "Здесь будет полный список рецептов кулинара.";
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 16px;
    color: #555;
    line-height: 1.5;
  }
  
  .btn-back-to-chefs {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }
  
  .btn-back-to-chefs:hover {
    background-color: #218838;
  }
  </style>
  