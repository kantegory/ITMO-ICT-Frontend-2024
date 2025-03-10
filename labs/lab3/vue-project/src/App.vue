<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view />
      <router-view name="404" v-if="$route.meta.notFound" />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>
