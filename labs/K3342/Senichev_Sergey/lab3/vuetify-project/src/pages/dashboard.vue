<template>
  <v-container v-if="user">
    <h1>Личный кабинет</h1>
    <div class="d-flex ga-6 mb-6 align-center justify-sm-start">
      <v-avatar :image="`${user.imageUrl}`" size="110"></v-avatar>
      <div>
        <h2>{{ user.username }}</h2>
        <p>{{ user.email }}</p>
        <p>Уровень: {{ user.level }}</p>
      </div>
    </div>
    <v-row>
      <v-col>
        <h2>Сохранённые тренировки</h2>
        <div cols="4" class="d-flex flex-wrap ga-4">
          <div v-for="workout in userWorkouts"
          :key="workout.id">
            <UserWorkoutCard
              dark
              @click="goToWorkoutDetails(workout.workout.id)"
              :workout="workout" />
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <h2>Выполненные тренировки</h2>
        <v-list>
          <v-list-item v-for="workout in completedWorkouts" :key="workout.id">
            {{ workout.name }}
          </v-list-item>
        </v-list>
      </v-col>
    </v-row> -->
    <!-- <v-row>
      <v-col>
        <h2>Последняя тренировка</h2>
        <p>{{ lastWorkout.name }}</p>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useAppStore } from '../stores/app'
import { useRouter } from 'vue-router'
import UserWorkoutCard from '@/components/user-workout-card.vue'

const store = useAppStore()
const router = useRouter()

const userWorkouts = computed(() => store.userWorkouts)

const savedWorkouts = ref([])
const completedWorkouts = ref([])
const lastWorkout = ref({})

if (!store.isAuthenticated) {
  router.push('/login');
}

const user = computed(() => JSON.parse(store.user))

onMounted(store.fetchUserWorkouts)
</script>

<style scoped>
h1 {
  margin: 24px 0;
}

h2 {
  margin: 16px 0;
}

/* .left-align {
  display: flex;
  justify-content: flex-start;
} */
</style>
