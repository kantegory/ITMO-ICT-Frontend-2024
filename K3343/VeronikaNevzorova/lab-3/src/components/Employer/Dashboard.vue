<template>
  <div>
    <header class="hero-section">
      <div class="container text-center">
        <h1 class="hero-title">Личный кабинет</h1>
        <p class="hero-subtitle">Управляйте своим профилем и вакансиями.</p>
      </div>
    </header>

    <section class="add-job-section py-5">
      <div class="container text-center">
        <h3 class="mb-4">Добавить новую вакансию</h3>
        <form @submit.prevent="addJob" class="d-inline-block text-center form-styled">
          <div class="mb-3">
            <label for="title" class="form-label">Название вакансии</label>
            <input
                type="text"
                id="title"
                v-model="newJob.title"
                class="form-control input-styled"
                required
            />
          </div>
          <div class="mb-3">
            <label for="company" class="form-label">Компания</label>
            <input
                type="text"
                id="company"
                v-model="newJob.company"
                class="form-control input-styled"
                required
            />
          </div>
          <div class="mb-3">
            <label for="salary" class="form-label">Зарплата</label>
            <input
                type="number"
                id="salary"
                v-model="newJob.salary"
                class="form-control input-styled"
                required
            />
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">Локация</label>
            <input
                type="text"
                id="location"
                v-model="newJob.location"
                class="form-control input-styled"
                required
            />
          </div>
          <button type="submit" class="btn btn-primary btn-blue">Добавить вакансию</button>
        </form>
      </div>
    </section>

    <div class="container mt-5">
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

          <div>
            <h6>Отклики:</h6>
            <ul>
              <li v-for="user in getApplicants(job.id)" :key="user.email">
                {{ user.username }} ({{ user.email }})
              </li>
            </ul>
            <p v-if="getApplicants(job.id).length === 0">Нет откликов.</p>
          </div>

          <button @click="deleteJob(job.id)" class="btn btn-danger mt-3">Удалить вакансию</button>
        </div>
      </div>
      <p v-else>Нет вакансий для отображения.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      jobs: [], // Все вакансии
      applications: [], // Отклики
      newJob: {
        title: "",
        company: "",
        salary: null,
        location: "",
      },
    };
  },
  methods: {
    // Загрузка вакансий с сервера
    async loadJobs() {
      try {
        const response = await axios.get("/api/jobs");
        if (response.status === 200) {
          this.jobs = response.data;
        } else {
          console.error("Ошибка загрузки вакансий:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка загрузки вакансий:", error);
      }
    },
    // Добавление новой вакансии
    async addJob() {
      try {
        const response = await axios.post("/api/jobs", this.newJob);
        if (response.status === 201) {
          const addedJob = response.data;
          this.jobs.push(addedJob);
          this.newJob = { title: "", company: "", salary: null, location: "" };
        } else {
          console.error("Ошибка при добавлении вакансии:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка при добавлении вакансии:", error);
      }
    },
    // Удаление вакансии (пометка как удаленной)
    async deleteJob(jobId) {
      try {
        const response = await axios.delete(`/api/jobs/${jobId}`);
        if (response.status === 200) {
          const jobIndex = this.jobs.findIndex((job) => job.id === jobId);
          if (jobIndex !== -1) {
            this.jobs[jobIndex].isDeleted = true;
          }
        } else {
          console.error("Ошибка удаления вакансии:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка удаления вакансии:", error);
      }
    },
    // Получение откликов на вакансию
    async loadApplications() {
      try {
        const response = await axios.get("/api/applications");
        if (response.status === 200) {
          this.applications = response.data;
        } else {
          console.error("Ошибка загрузки откликов:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка загрузки откликов:", error);
      }
    },
    getApplicants(jobId) {
      return this.applications.filter((app) => app.jobId === jobId);
    },
  },
  async mounted() {
    await this.loadJobs();
    await this.loadApplications();
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

.add-job-section {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.form-styled {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-styled {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: rgba(255, 255, 255, 0.8);
}

.input-styled:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.5);
}

.btn-blue {
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  color: white;
  border-radius: 4px;
  font-size: 16px;
}

.btn-blue:hover {
  background-color: #0056b3;
}

.job-card {
  cursor: pointer;
}

ul {
  padding-left: 20px;
}

h6 {
  margin-top: 20px;
  font-weight: bold;
}
</style>
