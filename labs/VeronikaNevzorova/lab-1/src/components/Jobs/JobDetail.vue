<template>
  <div class="container mt-5" v-if="job">
    <h2>{{ job.title }}</h2>
    <h4>{{ job.company }}</h4>
    <p><strong>Зарплата:</strong> {{ job.salary }}</p>
    <p><strong>Опыт:</strong> {{ job.experience }}</p>
    <p><strong>Описание:</strong> {{ job.description }} </p>
    <p><strong>Требования:</strong></p>
    <ul>
      <li v-for="requirement in job.requirements" :key="requirement">{{ requirement }}</li>
    </ul>
    <button class="btn btn-primary" @click="apply">Откликнуться</button>
  </div>
</template>

<script>
import { fetchJobs } from '@/mocks/mockJobs.js';

export default {
  props: ['id'],
  data() {
    return {
      job: null,
    };
  },
  methods: {
    async fetchJob() {
      try {
        const jobs = await fetchJobs();

        this.job = jobs.find(job => job.id === Number(this.id));
        if (!this.job) {
          alert('Вакансия не найдена');
        }
      } catch (error) {
        console.error('Ошибка при получении вакансии:', error);
        alert('Не удалось загрузить вакансию');
      }
    },
    apply() {
      alert('Отклик отправлен!');
    },
  },
  mounted() {
    this.fetchJob();
  },
};
</script>
