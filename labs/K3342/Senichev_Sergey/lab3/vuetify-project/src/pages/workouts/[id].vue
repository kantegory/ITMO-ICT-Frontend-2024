<template>
  <v-container class="py-4 ma-auto" v-if="workout">
    <div class="text-overline mb-1">{{ workout.type }}</div>
    <h1 class="my-6">{{ workout.title }}</h1>
    <div class="my-3 text-subtitle-1">{{ workout.description }}</div>
    <v-divider></v-divider>
    <div class="d-flex flex-column ga-2 mt-3">
        <p><strong>Длительность:</strong> {{ workout.duration }} минут</p>
        <p><strong>Сложность:</strong> {{ workout.difficulty }}</p>
        <p><strong>Оборудование:</strong> {{ equipment }}</p>
        <p><strong>Тренер:&nbsp;</strong> <RouterLink :to="`/trainers/${workout.trainer.id}`"> {{ workout.trainer.name }} </RouterLink></p>
    </div>

    <div class="d-flex align-center ga-3 mt-6 justify-start">
      <v-btn variant="outlined" color="white" @click="markAsCompleted">
        Выполнено
      </v-btn>
      <v-btn variant="outlined" color="white" @click="markAsFavourite">
        В избранное
      </v-btn>
      <v-btn variant="outlined" color="white" :to="'/workouts-list'">
        Назад к тренировкам
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/app';

const route = useRoute();

const store = useAppStore();

const workout = ref(null);

const equipment = computed(() => workout.value?.equipment ? workout.value.equipment.join(', ') : 'Нет');

const fetchWorkoutData = async (id) => {
  const data = await store.fetchWorkoutData(id)
  workout.value = data;
}

const workoutId = route.params.id;

onMounted(() => {
  fetchWorkoutData(workoutId);
});

const markAsCompleted = () => {
  alert('Тренировка успешно отмечена как выполненная!');
}

const markAsFavourite = () => {
  alert('Тренировка успешно отмечена как избранная!');
}
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
