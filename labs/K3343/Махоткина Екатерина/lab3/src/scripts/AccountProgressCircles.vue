<template>
  <hr>
  <section class="progress-section">
    <div class="progress-circles">
      <div class="progress-circle" v-for="(circle, index) in circles" :key="index">
        <h4>{{ circle.label }}</h4>
        <div class="circle" :id="circle.id" :style="circle.style">
          <span class="circle-text">{{ circle.text }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      circles: [],
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const storedUser = localStorage.getItem('user');
      this.user = JSON.parse(storedUser);
      this.initializeProgressCircles();
    },
    initializeProgressCircles() {
      const { startWeight, currentWeight, goalWeight, completedWorkouts, dateRegistration } = this.user;
      const progressPercent = Math.round(((startWeight - currentWeight) / (startWeight - goalWeight)) * 100);
      const registrationDate = new Date(dateRegistration);
      const currentDate = new Date();
      const daysSinceRegistration = Math.round((currentDate - registrationDate) / (1000 * 60 * 60 * 24));
      this.circles = [
        {
          id: "currentWeightCircle",
          label: "Current Weight",
          value: (currentWeight / startWeight) * 100,
          text: `${currentWeight} kg`,
        },
        {
          id: "progressPercentCircle",
          label: "Weight Progress",
          value: progressPercent,
          text: `${progressPercent}%`,
        },
        {
          id: "workoutsCompletedCircle",
          label: "Completed Workouts",
          value: (completedWorkouts / 50) * 100,
          text: completedWorkouts,
        },
        {
          id: "registrationDateCircle",
          label: "Days with FITNESS MK",
          value: (daysSinceRegistration / 365) * 100,
          text: daysSinceRegistration,
        },
      ];
      this.circles = this.circles.map(circle => {
        const percentage = Math.min(circle.value, 100);
        let color = "#1d7e33";

        if (percentage <= 30) {
          color = "red";
        } else if (percentage <= 60) {
          color = "orange";
        } else if (percentage <= 80) {
          color = "yellow";
        }

        return {
          ...circle,
          style: {
            background: `conic-gradient(${color} 0% ${percentage}%, #444 ${percentage}% 100%)`,
          },
        };
      })
    },
  },
};
</script>

<style scoped>
.progress-section {
  display: flex;
  flex-wrap: wrap;
  margin: 3% 3%;
  border: white 10px;
  border-radius: 30px;
}

.progress-circles {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin: 3% 3%;
  width: 100%;
  flex-wrap: wrap;
}

.progress-circle {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 1%;
}

.circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.circle::before {
  content: '';
  position: absolute;
  width: 70%;
  height: 70%;
  background-color: #000;
  border-radius: 50%;
}

.circle-text {
  position: relative;
  font-weight: bold;
  color: #fff;
}

hr {
  border: none;
  background-color: white;
  height: 2px;
}
</style>