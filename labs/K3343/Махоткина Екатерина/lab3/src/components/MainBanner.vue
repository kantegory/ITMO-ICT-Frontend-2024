<template>
  <hr>
  <section class="main-banner">
    <div class="container">
      <h1>Start your training now!</h1>
      <p>Track your progress, improve your stats and reach your goal with a wide range of our workouts.</p>
      <br>
      <router-link to="/trainings">See trainings</router-link>
    </div>
    <div class="main-banner-image">
      <img src="../assets/images/main-images/main_banner.jpg" alt="Main poster" />
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
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 5% 3% 5% 3%;
  max-width: 100%;
  margin: auto;
  height: auto;
}

.container {
  text-align: left;
  width: 100%;
}

p {
  color: #bbb;
}

a {
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 0.5%;
  text-decoration: none;
  text-align: center;
  background-color: #1d7e33;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

a:hover {
  background-color: #555555;
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
