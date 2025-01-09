<template>
  <div>
    <hr>
    <section class="popular-exercises">
      <div class="container-fluid">
        <h2>Popular Exercises</h2>
        <div class="row">
          <div v-for="exercise in exercises" :key="exercise.videoId" class="col-md-4">
            <div class="card mb-4">
              <img :src="exercise.image" class="card-img-top" :alt="exercise.title">
              <div class="card-body">
                <h3 class="video-title" @click="openModal(exercise)">{{ exercise.title }} </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr>

    <VideoModal
        v-if="showModal"
        :training="selectedExercise"
        @close="closeModal"
    />
  </div>
</template>

<script>
import VideoModal from '../scripts/VideoModal.vue';

export default {
  components: {VideoModal,},
  data() {
    return {
      exercises: [
        {
          title: 'Treadmill',
          videoId: 'RjqTbaLeCUs',
          image: '/src/assets/images/main-images/treadmill.jpg',
        },
        {
          title: 'Stretching',
          videoId: 'p7th1SMAsAY',
          image: '/src/assets/images/main-images/stretching.jpeg',
        },
        {
          title: 'Yoga',
          videoId: '65KVj8EMJIc',
          image: '/src/assets/images/main-images/yoga.jpg',
        },
        {
          title: 'Running',
          videoId: 'Y3uK06zHmVU',
          image: '/src/assets/images/main-images/running.jpg',
        },
        {
          title: 'Lifting',
          videoId: 'rqJpSSL0kB8',
          image: '/src/assets/images/main-images/lifting.jpg',
        },
        {
          title: 'Push up',
          videoId: '9SMDmCE58uI',
          image: '/src/assets/images/main-images/pushup.jpg',
        },
      ],
      selectedExercise: null,
      showModal: false,
    };
  },
  methods: {
    openModal(exercise) {
      this.selectedExercise = exercise;
      this.showModal = true;
    },
    closeModal() {
      this.selectedExercise = null;
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
hr {
  margin: 0 3% 0 3%;
  border: none;
  background-color: white;
  height: 2px;
}

.popular-exercises {
  padding: 2%;
}

.card {
  background-color: #000;
  border-color: #333333;
  border-width: 3px;
  color: white;
}

.video-title:hover {
  color: #1d7e33;
  cursor: pointer;
  transition: color 0.3s ease;
}
</style>
