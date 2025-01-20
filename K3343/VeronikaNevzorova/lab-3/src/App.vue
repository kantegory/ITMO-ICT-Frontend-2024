<template>
  <div id="app">

    <Navbar />

    <router-view />

  </div>
</template>

<script>

import Navbar from './components/Shared/Navbar.vue';



export default {
  name: 'App',
  components: {
    Navbar,

  },
};
</script>

<style>


body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>