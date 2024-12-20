<template>
  <div id="account">
    <Header />
    <AccountPersonalInformation />
    <AccountProgressCircles />
    <AccountProgressSection />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Header from '../layouts/Header.vue';
import AccountPersonalInformation from "@/components/AccountPersonalInformation.vue";
import AccountProgressCircles from "@/scripts/AccountProgressCircles.vue";
import AccountProgressSection from "@/components/AccountProgressSection.vue";
import Footer from '../layouts/Footer.vue';
</script>


