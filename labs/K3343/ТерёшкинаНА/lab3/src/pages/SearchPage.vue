<template>
  <ViewsHeader />
  <main>
    <SearchFilter />
    <SectionTitle title="Пабы" />
    <div class="card-container">
      <CardCard
          v-for="(pub, index) in pubs"
          :key="'pub-' + index"
          :image-src="pub.image"
          :title="pub.title"
          :time="pub.time"
      />
    </div>

    <SectionTitle title="Суши" />
    <div class="card-container">
      <CardCard
          v-for="(sushi, index) in sushi"
          :key="'sushi-' + index"
          :image-src="sushi.image"
          :title="sushi.title"
          :time="sushi.time"
      />
    </div>

    <SectionTitle title="Пиццерии" />
    <div class="card-container">
      <CardCard
          v-for="(pizza, index) in pizzas"
          :key="'pizza-' + index"
          :image-src="pizza.image"
          :title="pizza.title"
          :time="pizza.time"
      />
    </div>
  </main>
  <ViewsFooter />
</template>

<script setup>
import SearchFilter from '@/components/SearchFilter.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import CardCard from '@/components/CardCard.vue';
</script>

<style scoped>
.card-container {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
}
</style>
