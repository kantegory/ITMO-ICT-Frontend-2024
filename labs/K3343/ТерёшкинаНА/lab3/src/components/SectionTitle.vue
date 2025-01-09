<template>
  <div class="section-title">
    {{ title }}
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.section-title {
  text-align: center;
  font-size: 2em;
  margin-top: 20px;
  color: #f4f4f4;
  font-weight: bold;
}
</style>
