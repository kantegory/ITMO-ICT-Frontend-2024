<template>
    <form class="search-form" @submit.prevent="onSearch">
      <input
        v-model="query"
        type="text"
        placeholder="Поиск рецепта"
        class="search-input"
      />
      <button type="submit" class="search-button">Поиск</button>
    </form>
  </template>
  
  <script>
  export default {
    name: "SearchForm",
    data() {
      return {
        query: "",
      };
    },
    methods: {
      onSearch() {
        this.$emit("search", this.query);
      },
    },
  };
  </script>
  
  <style scoped>
  .search-form {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
  }
  
  .search-button {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #218838;
  }
  </style>
  