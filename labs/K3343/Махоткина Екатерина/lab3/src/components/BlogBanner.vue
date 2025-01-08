<template>
  <hr>
  <section class="main-banner">
    <div class="container">
      <h1>Blog</h1>
      <p>Are you someone who struggles with balancing your well-being? With all the health and wellness information available it’s easy to feel overwhelmed, unsure how to spend your time, energy, and resources to craft a well-balanced wellness practice.
        The health triangle is a framework and visualization tool to help you understand the three key aspects of overall well-being: physical, mental, and social health. Each of these areas is interconnected and plays an important role in achieving balance.</p>
    </div>
    <div class="main-banner-image">
      <img src="../assets/images/blog-images/poster.jpg" alt="Blog poster"/>
    </div>
  </section>
</template>

<style scoped>
hr {
  border: none;
  background-color: white;
  height: 2px;
}

.main-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5% 3% 5% 3%;
  max-width: 100%;
  height: auto;
}

p {
  margin-top: 1%;
  text-align: left;
  color: #bbb;
}

.main-banner-image {
  border-radius: 10px;
  overflow: hidden;
}

.main-banner-image img {
  width: 100%;
}
</style>