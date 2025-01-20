<template>
  <div>
    <Header />
    <div class="recipe-details">
      <h1>{{ recipe.title }}</h1>
      <img :src="recipe.image" alt="Изображение рецепта" />
      <p v-html="recipe.summary"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      recipe: {},
    };
  },
  mounted() {
    const apiKey = "10b9c47f2de24cc4b057c7eee5afbce6"; 
    fetch(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        this.recipe = data;
      })
      .catch((error) => console.error("Ошибка:", error));
  },
};
</script>

<style scoped>
.recipe-details {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
</style>
