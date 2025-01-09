<template>
  <section class="final-banner">
    <div class="container">
      <h2>Nothing is impossible!</h2>
      <p>Our platform allows you to train with special programs from the best experts from all over the world. The training process is intelligently built, so you can find the best programs for your desires and capabilities. We strive to popularize sports around the world, join us!</p>
    </div>
    <div class="main-banner-image">
      <img src="/src/assets/images/main-images/final.png" alt="Fitness Man" />
    </div>
  </section>
  <hr>
</template>

<style scoped>

hr {
  border: none;
  background-color: white;
  height: 2px;
}

.final-banner {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  max-width: 100%;
  margin: auto;
  height: auto;
  padding: 2% 3% 2% 3%;
}

.container {
  text-align: left;
  width: 100%;
}

p {
  color: #bbb;
}

.main-banner-image {
  border-radius: 10px;
  overflow: hidden;
  align-items: flex-end;
}

.main-banner-image img {
  max-width: 100%;
}

</style>
<script setup lang="ts">
</script>