<template>

  <v-divider />
  <v-card 
    class="CardLayout" 
    color="cardlayout"
    v-if="loading"
  >
    {{  statementData.data }}
  </v-card>

</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'


  const { statement, stock } = useStockStore()
  const loading = computed(() => !statement.loading && !stock.loading)
  const statementData = computed(() => statement.data)

  const label = computed(() => statement.data.date)


</script>

<style scoped>

</style>