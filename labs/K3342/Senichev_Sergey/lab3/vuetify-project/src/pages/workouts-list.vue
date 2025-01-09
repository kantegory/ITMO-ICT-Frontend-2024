<template>
  <v-item-group selected-class="bg-primary">
    <v-container>
      <h1 class="my-6">Тренировки</h1>
      <v-row>
        <v-col
          v-for="workout in store.workouts"
          :key="workout.id"
          cols="4">
          <v-item v-slot="{ selectedClass }">
            <WorkoutCard :class="[selectedClass]"
              dark
              @click="goToWorkoutDetails(workout.id)"
              :workout="workout" />
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script setup>
import WorkoutCard from '@/components/workout-card.vue'
import { useAppStore } from '@/stores/app';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

const store = useAppStore();
const router = useRouter();


if (!store.isAuthenticated) {
  router.push('/login');
}

const goToWorkoutDetails = (id) => {
  router.push(`/workouts/${id}`);
}

onMounted(store.fetchWorkouts)
</script>

<style scoped>
p {
  margin-top: 12px;
}
</style>
