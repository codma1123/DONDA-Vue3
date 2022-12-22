<template>
  <div class="DetailLayout">
    <!-- Title -->
    <StockTitle />

    <StockStatement />

  </div>
</template>

<script setup lang="ts">

  import StockTitle from '@/components/detail/StockTitle.vue'
  import StockStatement from '@/components/detail/statement/StockStatements.vue'

</script>

<style scoped lang="scss">

</style>