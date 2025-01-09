<template>
  <v-container class="py-4 ma-auto" v-if="trainer">
    <div class="text-overline mb-1">Тренер</div>
    <div class="d-flex ga-6 mb-6 align-center justify-sm-start">
      <v-avatar :image="`${trainer.image_url}`" size="110"></v-avatar>
      <div>
        <h2>{{ trainer.name }}</h2>
        <p>{{ trainer.title }}</p>
      </div>
    </div>
    <v-divider></v-divider>
    <div>
      <h2 class="my-3">Тренировки</h2>
      <!-- <v-list v-if="trainerWorkouts">
        <v-list-item v-for="workout in trainerWorkouts" :key="workout.id">
          {{ workout.title }}
        </v-list-item>
      </v-list> -->
      <div cols="4" class="d-flex flex-wrap ga-4">
        <div v-for="workout in trainerWorkouts"
        :key="workout.id">
          <WorkoutCard
            dark
            @click="goToWorkoutDetails(workout.id)"
            :workout="workout" />
        </div>
      </div>
    </div>


  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/app';
import WorkoutCard from '@/components/workout-card.vue';
import { useRouter } from 'vue-router'

const router = useRouter();
const route = useRoute();

const trainerId = route.params.id;

console.log(trainerId)

const store = useAppStore();

const trainer = ref(null);
const workouts = ref(null);
const trainerWorkouts = computed(() => {
  return workouts.value?.filter(workout => workout.trainer.id == trainerId)
});

const fetchTrainerDetails = async (id) => {
  const data = await store.fetchTrainerDetails(id)
  trainer.value = data;
}

const fetchWorkouts = async () => {
  await store.fetchWorkouts()
  workouts.value = store.workouts;
}

const goToWorkoutDetails = (id) => {
  router.push(`/workouts/${id}`);
}

onMounted(() => {
  fetchTrainerDetails(trainerId);
  fetchWorkouts()
});
</script>

<style scoped>
.text-overline {
  font-size: 0.9rem !important;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

p {
  font-size: 1rem;
}
</style>
