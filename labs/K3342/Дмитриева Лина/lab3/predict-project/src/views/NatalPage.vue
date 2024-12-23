<template>
  <div class="natal">
    <h1>Натальная карта</h1>
    <p>Исследуйте влияние звезд и планет на вашу судьбу.</p>

    <!-- Контейнер для карточек -->
    <div v-if="isLoading" class="loading">Загрузка данных...</div>
    <div v-else>
      <div class="row">
        <div
          v-for="card in natalCards"
          :key="card.name"
          class="col-md-6 col-lg-4 card-container"
        >
          <h2 class="video-title">{{ card.name }}</h2>
          <a
            :href="card.link"
            target="_blank"
            class="card-link"
            :title="'Посмотреть натальную карту ' + card.name"
          >
            <img
              :src="card.image"
              :alt="'Натальная карта ' + card.name"
              class="card-img"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useDataLoader from "@/composables/useDataLoader";
import { onMounted } from "vue";

export default {
  setup() {
    const { data: natalCards, isLoading, loadData } = useDataLoader("getNatalCards");

    onMounted(async () => {
      await loadData();
    });

    return { natalCards, isLoading };
  },
};
</script>



<style scoped>
.natal {
  text-align: center;
  margin: 2rem 0;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card-container {
  margin: 1rem;
  padding: 2rem;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Более выразительная тень */
  text-align: center;
  max-width: 350px; /* Максимальная ширина карточки */
}
.card-img {
  width: 100%; /* Картина занимает всю ширину карточки */
  height: auto; /* Сохраняем пропорции изображения */
  border-radius: 10px; /* Закругленные углы изображения */
  transition: transform 0.3s, box-shadow 0.3s;
}
.card-img:hover {
  transform: scale(1.1); /* Увеличение при наведении */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Тень при наведении */
}
.video-title {
  font-size: 1.5rem; /* Увеличенный шрифт заголовка */
  margin: 1rem 0;
  color: #f9f9f9;
}
.card-link {
  text-decoration: none;
  color: inherit;
}
</style>

