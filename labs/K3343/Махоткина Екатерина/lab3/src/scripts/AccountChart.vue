<template>
  <div class="chart-container">
    <h3>Weight Progress</h3>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      user: null,
      chartInstance: null,
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const storedUser = localStorage.getItem('user');
      this.user = JSON.parse(storedUser);
      this.initializeChart();
    },
    initializeChart() {
      const ctx = this.$refs.chart.getContext("2d");
      if (ctx) {
        this.chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: this.user.weightProgress.map((_, index) => `№${index + 1}`),
            datasets: [
              {
                label: "Weight Progress (kg)",
                data: this.user.weightProgress,
                backgroundColor: "rgba(40, 115, 69, 0.5)",
                borderColor: "#1d7e33",
                borderWidth: 4,
                fill: true,
                tension: 0.3,
              },
            ],
          },
        });
      }
    },
  },
};
</script>

<style scoped>

.chart-container {
  flex: 1;
  padding: 2%;
  border-radius: 10px;
}

.chart-container h3 {
  text-align: center;
}
</style>
