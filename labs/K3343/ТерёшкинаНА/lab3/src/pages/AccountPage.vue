<template>
  <ViewsHeader />
  <main>
    <div class="container mt-5">
      <div class="account-container">
        <UserProfile
            photoUrl="image/user-photo.jpg"
            userName="Наталья"
            userEmail="nteresh@mail.ru"
            userPassword="1N2a3T4a"
            userPhone="+7 (911) 348-08-88"
        />
        <UserFeatures
            :visitedPlaces="3"
            :upcomingReservations="1"
            favoritePlace="Сельдерай"
        />
      </div>
    </div>
  </main>
  <ViewsFooter />
</template>

<script setup>
import UserProfile from '@/components/UserProfile.vue';
import UserFeatures from '@/components/UserFeatures.vue';
</script>

<style scoped>
.account-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .account-container {
    flex-direction: column;
  }
}
</style>
