<template>
  <Navbar />
  <Searchform />
  <Articles />
  <FooterComponent />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Searchform from "@/components/Searchform.vue";
import Articles from "@/components/Articles.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "Main",
  components: {
    Navbar,
    Searchform,
    Articles,
    FooterComponent,
  },
};
</script>
