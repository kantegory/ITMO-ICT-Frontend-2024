<template>
  <hr>
  <section class="filter-section">
    <label for="sport-filter"> <h4> Choose your kind of training: </h4> </label>
    <select id="sport-filter" v-model="selectedFilter" @change="applyFilter">
      <option value="">All</option>
      <option value="Lifting">Lifting</option>
      <option value="Push up">Push up</option>
      <option value="Running">Running</option>
      <option value="Stretching">Stretching</option>
      <option value="Treadmill">Treadmill</option>
      <option value="Yoga">Yoga</option>
    </select>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedFilter: ''
    };
  },
  methods: {
    applyFilter() {
      this.$emit('filter-changed', this.selectedFilter);
    }
  }
};
</script>

<style scoped>
hr {
  margin: 0 3% 0 3%;
  border: none;
  background-color: white;
  height: 2px;
}

.filter-section {
  margin: 2% 0 0 3%;
  color: #fff;
}

.filter-section select {
  margin-left: 1%;
  border-radius: 10px;
  border-style: none;

}

</style>
