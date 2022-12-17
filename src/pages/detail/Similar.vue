<template>
  <div class="DetailLayout">

    <StockTitle />
    
    <StockSimilarInfo />
  </div>
</template>

<script setup lang="ts">

  import { onMounted } from 'vue'
  import StockSimilarInfo from '../../components/detail/similar/StockSimilarInfo.vue';
  import StockTitle from '../../components/detail/StockTitle.vue';

  onMounted(() => {
    console.log('mount')
  })

</script>

<style scoped>

</style>