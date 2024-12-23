<template>
  <div class="info">
    <h1>О сервисе</h1>

    <!-- Фильтр категорий -->
    <div class="filter-container">
      <label for="filterSelect">Выберите раздел:</label>
      <select id="filterSelect" v-model="selectedCategory">
        <option value="all">Все разделы</option>
        <option v-for="(section, index) in uniqueCategories" :key="index" :value="section">
          {{ section }}
        </option>
      </select>
    </div>

    <!-- Информационные блоки -->
    <div v-if="filteredInfoItems.length">
      <div v-for="(item, index) in filteredInfoItems" :key="index" class="info-item">
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
      </div>
    </div>
    <div v-else>
      <p>Загрузка информации...</p>
    </div>
  </div>
</template>

<script>
import useApi from "@/composables/useApi";

export default {
  data() {
    return {
      infoItems: [],
      selectedCategory: "all",
    };
  },

  computed: {
    uniqueCategories() {
      return this.infoItems.length
        ? [...new Set(this.infoItems.map((item) => item.category))]
        : [];
    },

    filteredInfoItems() {
      return this.infoItems.filter(
        (item) =>
          this.selectedCategory === "all" ||
          item.category === this.selectedCategory
      );
    },
  },

  async created() {
    const api = useApi();
    try {
      const response = await api.getSections();
      this.infoItems = response.data;
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      alert("Не удалось загрузить информацию о сервисе.");
    }
  },
};
</script>


<style scoped>
.info-item {
  margin-bottom: 15px;
}

.filter-container {
  margin-bottom: 20px;
}
</style>
