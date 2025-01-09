<template>

  <ViewsHeader />
  <main class="container mt-5">
    <MainFilter @filter-applied="applyFilter" />
    <div class="row">
      <MainCard
          v-for="apartment in paginatedApartments"
          :key="apartment.id"
          :title="apartment.title"
          :description="apartment.description"
          :image="apartment.image"
          :price="apartment.price"
      />
    </div>
    <MainPegination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="updatePage"
    />
  </main>
  <ViewsFooter />
</template>

<script setup>
import { ref, computed } from 'vue';
import MainCard from '@/components/MainCard.vue';
import MainFilter from '@/components/MainFilter.vue';
import MainPegination from '@/components/MainPegination.vue';
import ViewsHeader from "@/layouts/ViewsHeader.vue";
import ViewsFooter from "@/layouts/ViewsFooter.vue";

const apartments = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6; // Количество карточек на странице
const searchQuery = ref('');

const applyFilter = (query) => {
  searchQuery.value = query;
  currentPage.value = 1; // Сбросить на первую страницу при применении фильтра
};

const paginatedApartments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return apartments.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(apartments.value.length / itemsPerPage));
const updatePage = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
.search-container {
  margin-left: auto;
}
</style>