<template>
  <div>
    <header class="hero-section">
      <div class="container text-center">
        <h1 class="hero-title">Личный кабинет</h1>
        <p class="hero-subtitle">Управляйте своим профилем и резюме.</p>
      </div>
    </header>

    <section class="dashboard-section py-5">
      <div class="container">
        <h2 class="section-title text-center">Ваше резюме</h2>
        <p class="section-subtitle text-center">Здесь вы можете редактировать своё резюме и просматривать отклики.</p>

        <div class="resume-card mt-4 p-4 bg-light rounded shadow-sm">
          <h3 class="mb-3">Информация о вас</h3>
          <div v-if="!isEditing" id="resume-info">
            <p><strong>Имя:</strong> <span>{{ name }}</span></p>
            <p><strong>Email:</strong> <span>{{ email }}</span></p>
            <p><strong>Навыки:</strong> <span>{{ skills }}</span></p>
            <p><strong>Опыт:</strong> <span>{{ experience }}</span></p>
          </div>
          <div v-else>
            <h3>Редактировать резюме</h3>
            <form @submit.prevent="saveChanges">
              <div class="mb-3">
                <label for="edit-name" class="form-label">Имя</label>
                <input type="text" class="form-control" v-model="tempName" required />
              </div>
              <div class="mb-3">
                <label for="edit-email" class="form-label">Email</label>
                <input type="email" class="form-control" v-model="tempEmail" required />
              </div>
              <div class="mb-3">
                <label for="edit-skills" class="form-label">Навыки</label>
                <input type="text" class="form-control" v-model="tempSkills" required />
              </div>
              <div class="mb-3">
                <label for="edit-experience" class="form-label">Опыт</label>
                <input type="text" class="form-control" v-model="tempExperience" required />
              </div>
              <button type="submit" class="btn btn-success">Сохранить изменения</button>
              <button type="button" class="btn btn-secondary mt-2" @click="cancelEdit">Отменить</button>
            </form>
          </div>
          <button v-if="!isEditing" class="btn btn-primary mt-3" @click="editResume">Редактировать резюме</button>
        </div>

        <div class="applications mt-5">
          <h3 class="section-title">Мои отклики</h3>
          <ul class="list-group mt-3">
            <li
                class="list-group-item"
                v-for="job in visibleApplications"
                :key="job.id"
                :class="{ 'text-muted': job.isDeleted }"
            >
              {{ job.title }}
              <span v-if="job.isDeleted">(Вакансия удалена)</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="action-buttons mt-4 text-center">
      <router-link to="/jobs" class="btn btn-primary">Посмотреть вакансии</router-link>
    </section>

    <footer class="footer bg-dark text-white py-4">
      <div class="container text-center"></div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "Иван Иванов",
      email: localStorage.getItem("email") || "ivan@example.com",
      skills: "Веб-разработка, HTML, CSS, JavaScript",
      experience: "3 года",
      isEditing: false,
      tempName: "",
      tempEmail: "",
      tempSkills: "",
      tempExperience: "",
      appliedJobs: [],
      jobs: [],
      userId: "user123",
    };
  },
  computed: {
    visibleApplications() {
      return this.appliedJobs.map((jobId) => {
        const matchedJob = this.jobs.find((j) => j.id === jobId);
        return matchedJob ? { ...matchedJob } : { title: "Вакансия удалена", isDeleted: true };
      });
    },
  },
  methods: {
    async loadApplications() {
      try {
        const response = await axios.get(`/api/applications/${this.userId}`);
        this.appliedJobs = response.data.map((job) => job.id);
      } catch (error) {
        console.error("Ошибка загрузки откликов:", error);
      }
    },
    async fetchJobs() {
      try {
        const response = await axios.get("/api/jobs");
        if (response.status === 200) {
          this.jobs = response.data;
        }
      } catch (error) {
        console.error("Ошибка загрузки вакансий:", error);
      }
    },
    editResume() {
      this.isEditing = true;
      this.tempName = this.name;
      this.tempEmail = this.email;
      this.tempSkills = this.skills;
      this.tempExperience = this.experience;
    },
    saveChanges() {
      this.name = this.tempName;
      this.email = this.tempEmail;
      this.skills = this.tempSkills;
      this.experience = this.tempExperience;
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    },
  },
  async mounted() {
    await this.fetchJobs();
    await this.loadApplications();
  },
};
</script>

<style scoped>
.resume-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.section-subtitle {
  font-size: 1rem;
  color: #6c757d;
}

.list-group-item {
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #dee2e6;
}

.list-group-item:last-child {
  border-bottom: none;
}

.text-muted {
  color: #6c757d;
}

.hero-section {
  background-color: #007bff;
  color: #ffffff;
  padding: 40px 0;
  margin-bottom: 20px;
}
</style>
