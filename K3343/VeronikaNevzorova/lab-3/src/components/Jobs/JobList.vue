<template>
  <div>
    <header class="hero-section">
      <div class="container text-center">
        <h1 class="hero-title">Все вакансии</h1>
        <p class="hero-subtitle">Мы собрали лучшие вакансии для вас.</p>
      </div>
    </header>

    <section class="job-list-section py-5">
      <div class="container">
        <div v-if="jobs.length > 0">
          <div
              v-for="job in jobs"
              :key="job.id"
              class="job-card p-4 bg-light rounded shadow-sm mt-4"
          >
            <h4>{{ job.title }}</h4>
            <p><strong>Компания:</strong> {{ job.company }}</p>
            <p><strong>Зарплата:</strong> {{ job.salary }} руб.</p>
            <p><strong>Локация:</strong> {{ job.location }}</p>

            <button
                v-if="!job.isDeleted && !isApplied(job.id)"
                class="btn btn-outline-primary btn-sm"
                @click="applyForJob(job.id)"
            >
              Откликнуться
            </button>
            <p v-else-if="isApplied(job.id)" class="text-success">Вы уже откликнулись.</p>
            <p v-else class="text-danger">Вакансия удалена.</p>
          </div>
        </div>
        <p v-else class="text-center mt-5">Вакансии не найдены.</p>
      </div>
    </section>

    <div
        id="notification"
        v-show="notificationVisible"
        class="alert alert-success fixed-bottom mb-4 mx-auto"
        style="width: 300px;"
    >
      Вы успешно откликнулись на вакансию.
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      jobs: [],
      appliedJobs: [],
      notificationVisible: false,
      userId: "user123",
    };
  },
  methods: {
    async fetchJobs() {
      try {
        const response = await axios.get("/api/jobs");
        this.jobs = response.data;
      } catch (error) {
        console.error("Ошибка загрузки вакансий:", error);
      }
    },
    async fetchApplications() {
      try {
        const response = await axios.get(`/api/applications/${this.userId}`);
        this.appliedJobs = response.data.map((job) => job.id);
      } catch (error) {
        console.error("Ошибка загрузки откликов:", error);
      }
    },
    isApplied(jobId) {
      return this.appliedJobs.includes(jobId);
    },
    async applyForJob(jobId) {
      try {
        const response = await axios.post("/api/applications", {
          userId: this.userId,
          jobId,
        });

        if (response.status === 201) {
          this.appliedJobs.push(jobId);
          this.notificationVisible = true;
          setTimeout(() => (this.notificationVisible = false), 3000);
        }
      } catch (error) {
        console.error("Ошибка отклика:", error.response?.data?.message || error);
      }
    },
  },
  async mounted() {
    await this.fetchJobs();
    await this.fetchApplications();
  },
};
</script>

<style scoped>
.hero-section {
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  color: #ffffff;
  padding: 40px 0;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-top: 10px;
}

.job-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.job-card:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.text-success {
  color: green;
}

#notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
