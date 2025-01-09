<template>
  <div class="d-flex justify-content-between mt-4 row mx-auto">
    <div v-for="(recommendation, index) in recommendations" :key="index" class="col-12 col-xl-4 col-md-6 mb-4">
      <div class="card">
        <img :src="recommendation.image" class="card-img-top" :alt="recommendation.image">
        <div class="card-body">
          <h5 class="card-title">{{ recommendation.title }}</h5>
          <p class="card-text">{{ recommendation.description }}</p>
          <a href="#" class="btn btn-primary">Посмотреть</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const recommendations = [
  { image: 'https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-ulica-matrosa-zheleznyaka-2299586219-1.jpg', title: 'Студия, 18 м², 1/6 эт.', description: 'Пример описания первого объекта.' },
  { image: 'https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-vitebskiy-prospekt-2280348381-1.jpg', title: 'Апартаменты-студия, 12 м², 1/6 этаж', description: 'Пример описания второго объекта.' },
  { image: 'https://images.cdn-cian.ru/images/kvartira-sanktpeterburg-naberezhnaya-reki-moyki-2283526209-1.jpg', title: '3-комн. квартира, 60 м², 6/6 этаж', description: 'Пример описания третьего объекта.' }
];
</script>
