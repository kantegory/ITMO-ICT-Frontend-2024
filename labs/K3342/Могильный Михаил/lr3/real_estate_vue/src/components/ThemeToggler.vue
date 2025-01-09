<template>
  <button
    class="btn btn-outline-secondary"
    @click="toggleTheme"
  >
    {{ isDark ? 'Светлая тема' : 'Тёмная тема' }}
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme.js'
const { isDark, toggleTheme } = useTheme()
</script>
