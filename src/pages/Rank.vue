<template>
  <div v-if="!rank.loading">
    <div class="Title">
      <v-card-title v-font-size="25">
        순위 별 종목
      </v-card-title>
      <v-card-subtitle> 다양한 기준으로 정렬된 종목을 살펴보세요.</v-card-subtitle>


    </div>
  </div>
  <v-progress-circular v-else />
</template>

<script setup lang="ts">
  import { useStockStore } from '../store/stock';

  const { rank } = useStockStore()

  

  
</script>

<style scoped>
  .Title {
    margin-top: 75px;
    margin-left: 15px;
  }
</style>