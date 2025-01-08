<template>
  <section class="trainings">
    <div class="column">
      <div v-for="training in filteredTrainings" :key="training.videoId" class="row-md-2">
        <div class="training-card">
          <img :src="training.image" :alt="training.name">
          <div class="training-content">
            <h2 class="video-title" @click="openModal(training)" :data-sport="training.sport">{{ training.title }}</h2>
            <hr>
            <p>{{ training.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <VideoModal
      v-if="showModal"
      :training="selectedTraining"
      @close="closeModal"
    />
  </section>
</template>

<script>
import axios from 'axios';
import VideoModal from '../scripts/VideoModal.vue';

export default {
  components: { VideoModal },
  props: ['selectedFilter'],
  data() {
    return {
      selectedTraining: null,
      showModal: false,
      trainings: [],
    };
  },
  mounted() {
    this.fetchTrainings();
  },
  computed: {
    filteredTrainings() {
      if (!this.selectedFilter) {
        return this.trainings;
      }
      return this.trainings.filter(training => training.sport === this.selectedFilter);
    }
  },
  methods: {
    fetchTrainings() {
      axios.get('http://localhost:3000/trainings')
          .then(response => {this.trainings = response.data;});
    },
    openModal(training) {
      this.selectedTraining = training;
      this.showModal = true;
    },
    closeModal() {
      this.selectedTraining = null;
      this.showModal = false;
    }
  }
};
</script>


<style scoped>
.trainings {
  margin: 3% 3% 3% 3%;
}

.training-card {
  margin-top: 1%;
  background-color: #333333;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  height: 100%;
}

.training-card img {
  padding: 1% ;
  width: 30%;
  height: auto;
  object-fit: contain;
  align-self: flex-start;
}

.video-title:hover {
  color: #1d7e33;
  cursor: pointer;
  transition: color 0.3s ease;
}

.training-content {
  padding: 1%;
}

hr {
  margin: 1% 0;
  height: 2px;
  background-color: #1d7e33;
  border: none;
}

</style>
