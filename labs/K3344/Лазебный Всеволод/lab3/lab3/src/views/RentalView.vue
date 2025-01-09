<template>
  <ViewsHeader />
  <main class="container mt-5">
    <h1>Сдается 2-комн. квартира, 75 м² в ЖК «Премьер Палас»</h1>
    <div class="row">
      <div class="col-md-8">
        <Carousel />
        <div class="mt-3">
          <h4>Описание</h4>
          <p>Квартира в престижном жилом комплексе с современным ремонтом и полной инфраструктурой. Просторные комнаты, кухня и гостиная, оборудованная техникой. Близость к общественному транспорту и торговым центрам.</p>
        </div>
      </div>
      <div class="col-md-4">
        <PropertyDetails />
        <div class="mt-4">
          <h4>На карте:</h4>
          <MapContainer />
        </div>
      </div>
    </div>
    <div class="text-center mt-5">
      <h4>Рекомендации</h4>
    </div>
    <Recommendations />
  </main>
  <ViewsFooter />
</template>

<script setup>
import Carousel from '@/components/RentalCarousel.vue';
import MapContainer from '@/components/RentalMap.vue';
import PropertyDetails from '@/components/RentalPropertyDetails.vue';
import Recommendations from '@/components/RentalRecommendations.vue';
import ViewsHeader from "@/layouts/ViewsHeader.vue";
import ViewsFooter from "@/layouts/ViewsFooter.vue";
</script>
