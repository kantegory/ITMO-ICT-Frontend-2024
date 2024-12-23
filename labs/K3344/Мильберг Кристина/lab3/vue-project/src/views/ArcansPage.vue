<template>
  <div>
    <h1>Список Арканов</h1>

    <!-- Поле для поиска -->
    <input
      type="text"
      v-model="searchQuery"
      @input="filterArcanaList"
      placeholder="Поиск арканов..."
      class="form-control mb-3"
    />

    <!-- Проверяем состояние загрузки -->
    <div v-if="isLoading">Загрузка арканов...</div>
    <div v-else>
      <!-- Список арканов -->
      <div v-if="filteredArcanaList?.length">
        <div v-for="arcana in filteredArcanaList" :key="arcana.title" class="arcana-item">
          <img
            :src="arcana.image"
            :alt="'Изображение аркана ' + arcana.title"
            class="arcana-image"
            width="100"
            height="150"
          />
          <div>
            <h3 class="arcana-title">{{ arcana.title }}</h3>
            <p class="arcana-description">{{ arcana.description }}</p>
          </div>
        </div>
      </div>
      <p v-else>Нет результатов для отображения.</p>
    </div>
  </div>
</template>

<script>
import useApi from "@/composables/useApi";

export default {
  data() {
    return {
      arcanaList: [],
      filteredArcanaList: [],
      searchQuery: "",
      isLoading: true,
    };
  },
  methods: {
    async loadArcanaList() {
      const api = useApi();
      try {
        const response = await api.getArcanaList();
        this.arcanaList = response.data;
        this.filteredArcanaList = response.data;
      } catch (error) {
        console.error("Ошибка загрузки арканов:", error);
      } finally {
        this.isLoading = false;
      }
    },

    filterArcanaList() {
      const query = this.searchQuery.toLowerCase();
      this.filteredArcanaList = this.arcanaList.filter((arcana) =>
        arcana.title.toLowerCase().includes(query)
      );
    },
  },
  async mounted() {
    await this.loadArcanaList();
  },
};
</script>


<style scoped>
.arcana-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.arcana-image {
  margin-right: 1rem;
}
.arcana-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.arcana-description {
  font-size: 1rem;
  color: #6c757d;
}
</style>
