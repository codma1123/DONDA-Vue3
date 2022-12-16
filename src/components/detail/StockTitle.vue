<template>
  <v-card-title v-if="!stock.loading"> 
    <span v-font-size="30" class="font-weight-bold"> {{ stockData.name }} </span>
    <span v-font-size="15" class="ml-2"> {{ stockData.code }} </span>
  </v-card-title>
</template>

<script setup lang="ts">
  import { useStockStore } from '../../store/stock';
  import { computed } from 'vue'

  const { stock } = useStockStore()
  const stockData = computed(() => stock.data)
</script>
