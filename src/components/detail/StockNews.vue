<template>
  <v-card    
    elevation="0"
    v-if="!loading"
  > 
    <StockNewsContentVue 
      v-for="(content, i) in contents"
      :key="i"
      :content="content"
    />

  </v-card>
</template>

<script setup lang="ts">
  import { useStockStore } from '../../store/stock';
  import { computed } from 'vue';
  import StockNewsContentVue from './StockNewsContent.vue';

  const { news } = useStockStore()
  const contents = computed(() => news.data)
  const loading = computed(() => news.loading)
  
</script>

<style scoped>

</style>