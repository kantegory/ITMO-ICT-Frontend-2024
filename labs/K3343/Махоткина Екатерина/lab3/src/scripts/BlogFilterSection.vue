<template>
  <div>
    <h1 class="filters">Filters:</h1>
    <div class="filter-section">
      <label for="start-date">Start Date:</label>
      <input type="date" id="start-date" class="filter-section-date" v-model="filters.startDate" @input="onFilterChange">

      <label for="end-date">End Date:</label>
      <input type="date" id="end-date" class="filter-section-date" v-model="filters.endDate" @input="onFilterChange">
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        startDate: '',
        endDate: '',
        sports: []
      },
    };
  },
  methods: {
    onFilterChange() {
      this.$emit('filter-changed', this.filters);
    }
  }
};
</script>

<style scoped>
.filters {
  margin: 3% 3% 0 3%;
}

.filter-section {
  margin: 1% 3% 1% 3%;
  padding: 1%;
  display: flex;
  flex-wrap: wrap;
  gap: 1%;
  align-items: center;
  background-color: #333333;
  color: #fff;
  border: none;
  border-radius: 5px;
}

.filter-section label {
  display: inline-flex;
  align-items: center;
}

.filter-section input {
  margin-right: 2%;
  background-color: #555555;
}

.filter-section-date {
  background-color: #333333;
  border-radius: 5px;
  border-style: none;
  color: white;
  padding: 0.5%;
}
</style>