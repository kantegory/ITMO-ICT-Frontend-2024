<template>
  <div class="card">
    <img :src="recipe.image" :alt="recipe.title" class="card-img" />
    <div class="card-body">
      <h3 class="card-title">{{ recipe.title }}</h3>
      <p class="card-description">
        {{ recipe.summary ? recipe.summary.slice(0, 100) : "Описание отсутствует" }}
      </p>
      <button class="card-button" @click="viewDetails">
        Подробнее
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeCard",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
  viewDetails() {
    if (this.recipe.id) {
      this.$router.push({
        name: "RecipeDetails", 
        params: { id: this.recipe.id }, 
      });
    } else {
      console.error("ID рецепта отсутствует");
    }
  },
},
};
</script>

<style scoped>
.card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.card-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.card-button:hover {
  background-color: #218838;
}
</style>
