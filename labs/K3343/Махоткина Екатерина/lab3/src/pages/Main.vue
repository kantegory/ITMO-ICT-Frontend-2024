<template>
  <div id="main">
    <Header @openLogin="showAuthModal" />
    <MainBanner />
    <MainTrainings />
    <MainFinalBanner />
    <router-view />
    <Footer />

  </div>
</template>

<script setup>
import Header from '../layouts/Header.vue';
import MainBanner from '../components/MainBanner.vue';
import MainTrainings from '../components/MainExercises.vue';
import MainFinalBanner from "@/components/MainFinalBanner.vue";
import Footer from '../layouts/Footer.vue';

const showAuthModal = () => {
  const authModal = document.getElementById('authModal');
  authModal.show();
};
</script>

