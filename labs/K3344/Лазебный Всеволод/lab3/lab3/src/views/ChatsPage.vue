<template>
  <ViewsHeader />
  <main class="container mt-5 account-container">
    <ChatsMassages />
    <MainPegination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="updatePage"
    />
  </main>
  <ViewsFooter />
</template>

<script setup>
import ChatsMassages from '@/components/ChatsMassages.vue';
import MainPegination from "@/components/MainPegination.vue";
import ViewsHeader from "@/layouts/ViewsHeader.vue";
import ViewsFooter from "@/layouts/ViewsFooter.vue";
</script>