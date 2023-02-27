<template>  
  <v-sheet elevation="0" class="StockTitle">
    <v-card-title 
      v-if="!stock.loading" 
      class="d-flex justify-space-between"
      @click="push('/detail/' + stockData.code)"
    > 
      <div>
        <span 
          class="font-weight-bold"
          v-font-size="30" 
        >
          {{ stockData.name }} 
        </span>
        
        <span 
          class="code"
          v-font-size="15"
        > 
          {{ stockData.code }}
         </span>
      </div>
    </v-card-title>
  </v-sheet>
</template>

<script setup lang="ts">
  import { useCustomRouter } from '@/mixins/customRouter';
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'

  const { stock } = useStockStore()
  const { push } = useCustomRouter()
  
  const stockData = computed(() => stock.data)
  
</script>

<style lang="scss" scoped>

.StockTitle {
  position: sticky !important;
  top: 40px;
  z-index: 100;
}
.icon {
  transition: all 1s ease-in-out;
}

.code {
  opacity: .8;
  margin-left: 10px;
}
</style>
