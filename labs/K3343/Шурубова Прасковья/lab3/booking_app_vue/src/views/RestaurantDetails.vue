<template>
  <Navbar />
  <RestaurantDetail />
  <FooterComponent />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import RestaurantDetail from "@/components/RestaurantDetail.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "RestaurantDetails",
  components: {
    Navbar,
    RestaurantDetail,
    FooterComponent,
  },
};
</script>
