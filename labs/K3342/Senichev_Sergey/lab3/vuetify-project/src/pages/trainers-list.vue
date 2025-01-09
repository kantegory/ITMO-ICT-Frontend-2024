<template>
  <v-item-group selected-class="bg-primary">
    <v-container>
      <h1 class="my-6">Тренеры</h1>
      <v-row>
        <v-col cols="12"
          v-for="trainer in store.trainers"
          :key="trainer.id">
          <v-item v-slot="{ selectedClass, toggle }">
            <TrainerCard :class="[selectedClass]"
              @click="toggle" :trainer="trainer" />
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script setup>
import TrainerCard from '@/components/trainer-card.vue'

import { useAppStore } from '@/stores/app';

const store = useAppStore();

const fetchTrainers = async () => {
  await store.fetchTrainers();
}

fetchTrainers()

</script>
