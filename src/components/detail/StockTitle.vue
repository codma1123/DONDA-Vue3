<template>  
  <v-sheet elevation="0" class="StockTitle">
    <v-card-title v-if="!stock.loading" class="d-flex justify-space-between"> 
      <div>
        <span v-font-size="30" class="font-weight-bold"> {{ stockData.name }} </span>
        <span v-font-size="15" class="code"> {{ stockData.code }} </span>
      </div>
      <v-btn icon variant="text" @click="iconToggle = !iconToggle">
        <v-icon class="icon">{{icon}}</v-icon>
      </v-btn>
    </v-card-title>
  </v-sheet>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed, ref } from 'vue'

  const { stock } = useStockStore()

  const iconToggle = ref<boolean>(false)
  
  const stockData = computed(() => stock.data)
  const icon = computed(() => iconToggle.value ? 'mdi-bookmark' : 'mdi-bookmark-outline')  
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
