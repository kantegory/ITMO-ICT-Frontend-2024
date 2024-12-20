<template>
  <section class="numeric-section">
    <AccountChart />
    <AccountMeasuresTable />
  </section>
</template>

<script setup>
import AccountChart from "@/scripts/AccountChart.vue";
import AccountMeasuresTable from "@/components/AccountMeasuresTable.vue";
</script>

<style scoped>
.numeric-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  margin: 2%;
  align-items: center;
}
</style>