<template>
  <div>
    <Header />
    <TrainingsBanner />
    <TrainingFilterSection @filter-changed="handleFilterChange" />
    <TrainingsExercises :selectedFilter="selectedFilter" />
    <Footer />
  </div>
</template>

<script>
import Header from '../layouts/Header.vue';
import Footer from '../layouts/Footer.vue';
import TrainingFilterSection from "../scripts/TrainingsFilterSection.vue";
import TrainingsBanner from "../components/TrainingsBanner.vue";
import TrainingsExercises from "../components/TrainingsTrainings.vue";

export default {
  components: {
    Header,
    TrainingsBanner,
    TrainingFilterSection,
    TrainingsExercises,
    Footer
  },
  data() {
    return {
      selectedFilter: ''
    };
  },
  methods: {
    handleFilterChange(filter) {
      this.selectedFilter = filter;
    }
  }
};
</script>
