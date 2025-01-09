<template>
    <nav class="navbar">
      <div class="container">
        <a class="navbar-brand" href="/">YUMMY</a>
        <ul class="navbar-menu">
          <li><router-link to="/personal-page" class="navbar-link">Личный кабинет</router-link></li>
          <li><router-link to="/recipes" class="navbar-link">Рецепты</router-link></li>
          <li><router-link to="/chefs" class="navbar-link">Кулинары</router-link></li>
        </ul>
        <button class="logout-button" @click="logout">Выйти</button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Header",
    methods: {
      logout() {
        if (confirm("Вы уверены, что хотите выйти?")) {
          
          this.$router.push("/login");
        }
      },
    },
  };
  </script>
  
  <style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa; 
  padding: 15px 30px;
  width: 100%; 
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
}

.navbar-brand {
  font-size: 24px;
  font-weight: bold;
  color: #006400;
  text-decoration: none;
}

.navbar-menu {
  list-style: none;
  display: flex;
  gap: 30px; 
  margin: 0;
  padding: 0;
}

.navbar-link {
  text-decoration: none;
  color: #006400; 
  font-size: 16px;
  font-weight: 500;
}

.navbar-link:hover {
  color: #228B22; 
}

.logout-button {
  background-color: #ff6b6b
;  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #ff4c4c; 
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; 
  width: 100%; 
  margin: 0 auto; 
}
</style>