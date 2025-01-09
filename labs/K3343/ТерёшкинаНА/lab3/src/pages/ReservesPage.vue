<template>
  <ViewsHeader />
  <main>
    <div class="container mt-5">
      <div class="main-mb-4 text-center">
        <SectionTitle title="Бронь" />
        <div class="d-flex justify-content-center flex-wrap">
          <MainReservationCard
              image-src="https://welcome.mosreg.ru/cache/thumbs/thumb_1024_576_94276578.jpg"
              title="Чехов"
              :stars="5"
              date="01.01.2024"
              :people="2"
          />
        </div>
      </div>

      <div class="other-mb-4 text-center">
        <SectionTitle title="История" />
        <div class="d-flex justify-content-center flex-wrap">
          <ReservationCard
              v-for="(card, index) in reservationCards"
              :key="'reservation-' + index"
              :image-src="card.imageSrc"
              :title="card.title"
              :stars="5"
              :date="card.date"
              :people="card.people"
          />
        </div>
      </div>
    </div>
  </main>
  <ViewsFooter />
</template>

<script setup>
import SectionTitle from '@/components/SectionTitle.vue';
import MainReservationCard from '@/components/MainReservationCard.vue';
import ReservationCard from '@/components/ReservationCard.vue';
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>
