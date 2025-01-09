<template>
  <ViewsHeader />
  <main class="container mt-5 account-container">
    <UserInfo />
    <DealsList />
  </main>
  <ViewsFooter />
</template>

<script setup>
import UserInfo from '@/components/UserInfo.vue';
import DealsList from '@/components/DealsList.vue';
import ViewsHeader from "@/layouts/ViewsHeader.vue";
import ViewsFooter from "@/layouts/ViewsFooter.vue";
</script>

<style scoped>
.account-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .account-container {
    flex-direction: column;
  }
}
</style>
