<template>
  <v-navigation-drawer :width="320"
    location="right"
    permanent>
    <v-list-item
      lines="two"
      subtitle="Logged in"
      :prepend-avatar="`${user.imageUrl}`"
      :title="`${user.username}`"
    ></v-list-item>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item to="/dashboard" link title="Личный кабинет"></v-list-item>
      <v-list-item to="/workouts-list" link title="Тренировки"></v-list-item>
      <v-list-item to="/trainers-list" link title="Тренеры"></v-list-item>
      <v-list-item to="/logout" title="Выйти"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>


<script setup>
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';

const store = useAppStore();

const user = computed(() => JSON.parse(store.user))
</script>
