<template>
  <transition name="fade" :duration="1000">
  <v-card 
    v-if="(!loading && data)"
    class="CardLayout" 
    color="cardlayout"
    elevation="2"    
  >
    <v-card-title class="font-weight-bold d-flex justify-space-between">
      <div>
        <span> {{ data.name }} </span>
        <span class="ml-2 stockCode" v-font-size="15"> {{ data.code }} </span>
      </div>
      <div>
        <v-icon>mdi-bookmark-outline</v-icon>
      </div>
    </v-card-title>       
          
    <v-card-text>
      <v-chip label class="SectorChip"> {{ data.sector }} </v-chip>          
    </v-card-text>
  </v-card> 
</transition>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useStockStore } from '../../store/stock';

  // hooks
  const { stock } = useStockStore()
  const data = computed(() => stock.data)
  const loading = computed(() => stock.loading)




  

</script>

<style scoped>

</style>