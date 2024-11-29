<template>
  <div class="container mt-5">
    <h2>Вакансии</h2>
    <div class="row mb-4">
      <div class="col-md-3">
        <label for="industry" class="form-label">Отрасль</label>
        <select v-model="filters.industry" class="form-select" id="industry">
          <option value="">Все</option>
          <option v-for="industry in industries" :key="industry" :value="industry">
            {{ industry }}
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="salary" class="form-label">Зарплата</label>
        <input type="number" v-model="filters.salary" class="form-control" id="salary" placeholder="Минимум" />
      </div>
      <div class="col-md-3">
        <label for="experience" class="form-label">Опыт</label>
        <select v-model="filters.experience" class="form-select" id="experience">
          <option value="">Любой</option>
          <option value="junior">Начинающий</option>
          <option value="mid">Средний</option>
          <option value="senior">Старший</option>
        </select>
      </div>
      <div class="col-md-3 d-flex align-items-end">
        <button class="btn btn-primary" @click="fetchJobs">Поиск</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="job in jobs" :key="job.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ job.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ job.company }}</h6>
            <p class="card-text">Зарплата: {{ job.salary }}</p>
            <router-link :to="`/jobs/${job.id}`" class="card-link">Подробнее</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jobs: [],
      industries: ['IT', 'Маркетинг', 'Финансы', 'Здравоохранение', 'Образование'],
      filters: {
        industry: '',
        salary: '',
        experience: '',
      },
    };
  },
  methods: {
    async fetchJobs() {
      try {
        const response = await axios.get('/api/jobs', { params: this.filters });
        this.jobs = response.data;
      } catch (error) {
        console.error('Ошибка при получении вакансий:', error);
        alert('Не удалось загрузить вакансии');
      }
    },
  },
  mounted() {
    this.fetchJobs();
  },
};
</script>