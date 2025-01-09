<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center mt-4">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Предыдущая</a>
      </li>
      <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Следующая</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MainPagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      this.$emit('update:currentPage', page);
    },
  },
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}
</style>
