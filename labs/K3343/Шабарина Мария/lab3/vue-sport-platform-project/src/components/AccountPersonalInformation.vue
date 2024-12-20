<template>
  <hr>
  <section class="profile-section">
    <div class="profile-info">
      <img :src="user.avatar" alt="Profile avatar" class="profile-avatar">
      <div class="profile-details">
        <h1>{{ user.name }}</h1>
        <p>Gender: {{ user.gender }}</p>
        <p>Age: {{ user.age }}</p>
        <p>Current Weight: {{ user.currentWeight }} kg</p>
        <p>Completed Workouts: {{ user.completedWorkouts }}</p>
      </div>
    </div>
    <div class="frequent-workouts">
      <h2>Most Frequent Workouts</h2>
      <div class="frequent-workouts-list">
        <ul>
          <li v-if="user.frequentWorkouts.length === 0">No frequent workouts</li>
          <li v-for="(workout, index) in user.frequentWorkouts" :key="index">
            {{ workout }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        gender: '',
        age: null,
        currentWeight: null,
        completedWorkouts: 0,
        avatar: '',
        frequentWorkouts: [],
      },
    };
  },
  mounted() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      if (this.user.gender === "male"){
        this.user.avatar = "../src/assets/images/account-images/male-avatar.png"
      }
      else {
        this.user.avatar = "../src/assets/images/account-images/female-avatar.png"
      }
    }
  }
};
</script>

<style scoped>
hr {
  border: none;
  background-color: white;
  height: 2px;
}

.profile-section {
  margin: 3% 3%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.profile-info {
  display: flex;
}

.profile-avatar {
  width: 15%;
  height: 15%;
  border-radius: 50%;
  margin-right: 3%;
  object-fit: cover;
}

.profile-details h1 {
  margin-bottom: 1%;
}

.profile-details p {
  color: #bbb;
  margin: 0.5% 0;
}

h2 {
  margin-bottom: 1%;
}

ul li {
  background-color: #333333;
  padding: 3%;
  border-radius: 10px;
  margin-top: 1%;
  text-align: center;
  list-style-type: none;
}
</style>