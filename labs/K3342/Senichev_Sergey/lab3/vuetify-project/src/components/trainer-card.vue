<template>
  <v-card class="d-flex align-center pa-4"
          :to="`/trainers/${trainer.id}`">
    <v-avatar :image="`${trainer.image_url}`" size="80"></v-avatar>
    <div>
      <v-card-title>{{ trainer.name }}</v-card-title>
      <v-card-subtitle>{{ trainer.title }}</v-card-subtitle>
    </div>
  </v-card>
</template>

<script setup>

const props = defineProps({
  trainer: {
    type: Object,
    required: true
  }
})
</script>
