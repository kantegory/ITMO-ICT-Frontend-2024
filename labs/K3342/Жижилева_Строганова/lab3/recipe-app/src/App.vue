<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style>
/* Общие переменные */
:root {
  --light-background: #fafafa;
  --dark-background: #121212;
  --light-text-color: #333;
  --dark-text-color: #E0E0E0;
  --primary-color: #556B2F; /* Зеленый */
  --secondary-color: #c5a16f; /* Золотистый */
  --highlight-color: #8FBC8F; /* Светло-оливковый */
  --focus-color: #98FB98; /* Светло-зеленый для фокуса */
  --hover-color: #7b9e6e; /* Зеленый при наведении */
  --border-color: #B0C4DE; /* Голубой при фокусе */
  --danger-color: #f082b5; /* Розовый */
  --danger-hover-color: #ff0000; /* Красный при наведении */
  --dark-background-color: #1E1E1E; /* Темный фон для секций */
  --comment-border-color: #8FBC8F;
  --graphite-gray: #2B2B2B; /* Графитово-серый для фона модальных окон */
}

/* Общий стиль документа */
html, body {
  color: var(--light-text-color);
  font-family: 'Lora', serif;
  min-height: 100vh;
  background-size: cover;
  margin: 0;
  position: relative;
  overflow-y: scroll;
}

body h2 {
  color: var(--primary-color);
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  font-size: 3em;
}

.container {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
}

.form-group label {
  color: var(--primary-color);
}

.form-control {
  border: 2px solid var(--secondary-color);
}

.form-control:focus {
  border-color: var(--border-color);
  box-shadow: 0 0 10px rgba(107, 142, 35, 0.3);
}

.btn-primary {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: #fff;
}

.btn-primary:hover {
  background-color: var(--hover-color);
}

</style>
