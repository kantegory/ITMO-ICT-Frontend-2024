<template>
  <header class="navbar navbar-expand-lg">
    <router-link to="/">Fitness</router-link>
    <nav>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/trainings">Trainings</router-link>
      <router-link v-if="CheckUser" to="/account" class="btn btn-primary"> Account </router-link>
      <button v-else type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#authModal"> Auth </button>
    </nav>
  </header>
  <AuthModal ref="authModal" />
</template>

<script>
import AuthModal from "@/scripts/AuthModal.vue";

export default {
  components: {AuthModal},
  computed: {
    CheckUser() {
      if(localStorage.getItem('user')) {
        return true
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5% 3% 0.5% 3%;
}

nav {
  display: flex;
  flex-direction: row;
}

a, button {
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 0.5%;
  text-decoration: none;
  text-align: center;
  background-color: #333333;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

a:hover {
  background-color: #555555;
}

button:hover {
  background-color: #555555;
}
</style>
