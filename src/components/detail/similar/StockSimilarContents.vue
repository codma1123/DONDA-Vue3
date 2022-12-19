<template>
  <v-card v-if="loading" elevation="0">
    <v-card-title>    
      <v-chip label>
        <span v-font-size="11">
          {{ stockData.sector }} 내 유사기업
        </span>
      </v-chip>      
    </v-card-title>
    <v-card-text>
      <StockSimilarContent 
        v-for="content in similarContentsData" 
        :key="content.code"
        :similarContent="content"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue';
  import StockSimilarContent from '@/components/detail/similar/StockSimilarContnet.vue'


  const { similarContents, stock } = useStockStore()

  const similarContentsData = computed(() => similarContents.data.slice(1, 6))
  const stockData = computed(() => stock.data)
  const loading = computed(() => !similarContents.loading && !stock.loading)

</script>
