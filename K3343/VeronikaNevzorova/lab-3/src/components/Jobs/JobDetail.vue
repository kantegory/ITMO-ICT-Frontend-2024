<template>
  <div>
    <section v-if="job" class="job-detail-section py-5">
      <div class="container">
        <h2 class="section-title text-center">Подробности вакансии</h2>
        <div class="job-detail-card p-4 bg-light rounded shadow-sm mt-4">
          <h3>{{ job.title }}</h3>
          <p><strong>Компания:</strong> {{ job.company }}</p>
          <p><strong>Зарплата:</strong> {{ job.salary }} руб.</p>
          <p><strong>Локация:</strong> {{ job.location }}</p>
          <p><strong>Описание:</strong> {{ job.description }}</p>
          <p><strong>Требуемые навыки:</strong></p>
          <ul>
            <li v-for="skill in job.skills" :key="skill">{{ skill }}</li>
          </ul>
          <p><strong>Условия работы:</strong></p>
          <ul>
            <li v-for="condition in job.conditions" :key="condition">{{ condition }}</li>
          </ul>
        </div>
      </div>
    </section>
    <div v-else class="text-center py-5">
      <h3>Вакансия не найдена.</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      jobs: [
        {
          title: 'Frontend Developer',
          company: 'IT Solutions',
          salary: 120000,
          location: 'Москва',
          description: 'Разработка пользовательского интерфейса для веб-приложений.',
          skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Git'],
          conditions: ['Офис в центре Москвы', 'Гибкий график', 'Медицинская страховка'],
        },
        {
          title: 'Backend Developer',
          company: 'WebSoft',
          salary: 140000,
          location: 'Санкт-Петербург',
          description: 'Разработка и поддержка серверной части веб-приложений.',
          skills: ['Python', 'Django', 'SQL', 'REST API', 'Docker'],
          conditions: ['Удаленная работа', 'Обучение за счет компании', 'ДМС'],
        },
        {
          title: 'UI/UX Designer',
          company: 'Design Studio',
          salary: 90000,
          location: 'Новосибирск',
          description: 'Создание дизайнов для мобильных и веб-приложений.',
          skills: ['Figma', 'Sketch', 'Photoshop', 'Анализ UX', 'Прототипирование'],
          conditions: ['Офис рядом с метро', 'Бесплатные обеды', 'Оплачиваемый отпуск'],
        },
      ],
      job: null,
    };
  },
  created() {
    this.job = this.jobs.find((job) => job.title === this.id);
  },
};
</script>

<style scoped>
.job-detail-section {
  background-color: #f5f5f5;
}

.job-detail-card {
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

h3 {
  margin-bottom: 20px;
}

ul {
  padding-left: 20px;
}
</style>