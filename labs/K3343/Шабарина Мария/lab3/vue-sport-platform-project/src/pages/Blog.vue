<template>
  <div id="blog">
    <Header />
    <BlogBanner />
    <BlogFilterSection @filter-changed="handleFilterChange" />
    <BlogPosts :selectedFilter="selectedFilter" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '../layouts/Header.vue';
import BlogBanner from "@/components/BlogBanner.vue";
import BlogFilterSection from "@/scripts/BlogFilterSection.vue";
import BlogPosts from "@/components/BlogPosts.vue";
import Footer from '../layouts/Footer.vue';

export default {
  components: {
    Header,
    BlogBanner,
    BlogFilterSection,
    BlogPosts,
    Footer
  },
  data() {
    return {
      selectedFilter: {
        startDate: '',
        endDate: '',
        sports: []
      }
    };
  },
  methods: {
    handleFilterChange(filter) {
      this.selectedFilter = filter;
    }
  }
};
</script>
