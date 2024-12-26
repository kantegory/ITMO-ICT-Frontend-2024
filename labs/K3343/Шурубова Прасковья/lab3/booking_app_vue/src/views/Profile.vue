<template>
  <Navbar />
  <ProfileCard />
  <FooterComponent />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "Profile",
  components: {
    Navbar,
    ProfileCard,
    FooterComponent,
  },
};
</script>
