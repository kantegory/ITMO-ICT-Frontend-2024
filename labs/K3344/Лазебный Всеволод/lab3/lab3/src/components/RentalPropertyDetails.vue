<template>
  <div>
    <h3>Цена: <strong>{{ price }}</strong></h3>
    <h4>характеристики:</h4>
    <ul>
      <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
    </ul>
    <button class="btn btn-primary w-100 mt-3">Показать контакты</button>
  </div>
</template>

<script setup>
const price = '150 000 ₽/мес';
const features = ['Этаж: 7 из 24', 'Количество комнат: 2', 'Площадь: 75 м²', 'Совмещенный санузел'];
</script>
