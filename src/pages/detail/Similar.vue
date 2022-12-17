<template>
  <div class="DetailLayout">

    <StockTitle />
    
    <StockSimilarInfo />

    <StockSimilarContents />
    
  </div>
</template>

<script setup lang="ts">

  import { onMounted } from 'vue'
  import StockSimilarInfo from '@/components/detail/similar/StockSimilarInfo.vue'
  import StockTitle from '@/components/detail/StockTitle.vue'
  import StockSimilarContents from '@/components/detail/similar/StockSimilarContents.vue'

  onMounted(() => {
    console.log('mount')
  })

</script>

<style scoped>

</style>