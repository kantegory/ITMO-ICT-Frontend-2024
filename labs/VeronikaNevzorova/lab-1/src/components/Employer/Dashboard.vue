<template>
  <div class="container mt-5">
    <h2>Кабинет работодателя</h2>
    <button class="btn btn-primary mb-3" @click="openCreateJobModal">Создать вакансию</button>
    <div class="list-group">
      <div class="list-group-item" v-for="job in jobs" :key="job.id" @click="viewJobDetails(job.id)">
        <h5>{{ job.title }}</h5>
        <p>{{ job.description }}</p>
        <button class="btn btn-sm btn-secondary" @click.stop="editJob(job)">Редактировать</button>
        <button class="btn btn-sm btn-danger" @click.stop="deleteJob(job.id)">Удалить</button>
      </div>
    </div>

    <!-- Модальное окно для создания/редактирования вакансии -->
    <div class="modal fade" id="jobModal" tabindex="-1" aria-labelledby="jobModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="saveJob">
            <div class="modal-header">
              <h5 class="modal-title" id="jobModalLabel">{{ isEditing ? 'Редактировать' : 'Создать' }} вакансию</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="title" class="form-label">Название</label>
                <input type="text" v-model="currentJob.title" class="form-control" id="title" required />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Описание</label>
                <textarea v-model="currentJob.description" class="form-control" id="description" required></textarea>
              </div>
              <div class="mb-3">
                <label for="salary" class="form-label">Зарплата</label>
                <input type="number" v-model="currentJob.salary" class="form-control" id="salary" required />
              </div>
              <div class="mb-3">
                <label for="experience" class="form-label">Опыт</label>
                <select v-model="currentJob.experience" class="form-select" id="experience" required>
                  <option value="junior">Начинающий</option>
                  <option value="mid">Средний</option>
                  <option value="senior">Старший</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
              <button type="submit" class="btn btn-primary">{{ isEditing ? 'Сохранить изменения' : 'Создать' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchJobs } from '@/mocks/mockJobs.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      jobs: [],
      currentJob: {
        id: null,
        title: '',
        description: '',
        salary: '',
        experience: '',
      },
      isEditing: false,
      jobModal: null,
    };
  },
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
  methods: {
    async fetchJobs() {
      try {
        this.jobs = await fetchJobs();
      } catch (error) {
        console.error('Ошибка при получении вакансий:', error);
        alert('Не удалось загрузить вакансии');
      }
    },
    openCreateJobModal() {
      this.isEditing = false;
      this.currentJob = {
        id: null,
        title: '',
        description: '',
        salary: '',
        experience: '',
      };
      this.jobModal.show();
    },
    editJob(job) {
      this.isEditing = true;
      this.currentJob = {...job};
      this.jobModal.show();
    },
    async saveJob() {
      try {
        if (this.isEditing) {
          alert('Вакансия обновлена (моковые данные)');
        } else {
          alert('Вакансия создана (моковые данные)');
        }
        this.jobModal.hide();
        this.fetchJobs(); // Обновляем список вакансий
      } catch (error) {
        console.error('Ошибка при сохранении вакансии:', error);
        alert('Не удалось сохранить вакансию');
      }
    },
    async deleteJob(id) {
      if (confirm('Вы уверены, что хотите удалить эту вакансию?')) {
        try {
          alert('Вакансия удалена (моковые данные)');
          await this.fetchJobs();
        } catch (error) {
          console.error('Ошибка при удалении вакансии:', error);
          alert('Не удалось удалить вакансию');
        }
      }
    },
    viewJobDetails(jobId) {
      this.router.push(`/jobs/${jobId}`);
    },
  },
  mounted() {
    this.fetchJobs();
    this.jobModal = new Modal(document.getElementById('jobModal'));
  },
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>
