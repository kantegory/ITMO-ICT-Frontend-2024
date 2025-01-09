<template>
  <Navbar />
  <FavoriteHistory />
  <FooterComponent />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import FavoriteHistory from "@/components/FavoriteHistory.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "Favorites",
  components: {
    Navbar,
    FavoriteHistory,
    FooterComponent,
  },
};
</script>
