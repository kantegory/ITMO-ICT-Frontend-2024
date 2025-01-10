<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
body.login-page {
  background-image: url("../src/assets/image/main.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
}

body.dark-theme {
  background-color: #1a1b1c;
  color: white;

  .theme-switcher {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #1a1b1c;
    border-bottom: 1px solid #1a1b1c;
    justify-content: center;
  }

  .card {
    background: #373a3c;
    height: 100%;
    width: 100%;
    margin: 0 10px;
    border-radius: 6% / 5%;
  }
}
</style>

