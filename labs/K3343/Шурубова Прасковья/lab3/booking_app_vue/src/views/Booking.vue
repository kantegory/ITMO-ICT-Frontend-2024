<template>
  <Navbar />
  <BookingHistory />
  <FooterComponent />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BookingHistory from "@/components/BookingHistory.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "Booking",
  components: {
    Navbar,
    BookingHistory,
    FooterComponent,
  },
};
</script>
