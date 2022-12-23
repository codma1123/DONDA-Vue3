<template>

  <v-divider />
  <v-card 
    class="CardLayout" 
    color="cardlayout"
    v-if="loading"
  >
    <div v-for="statementContent in statementContents" :key="statementContent.type">
      {{ statementContent }}
    </div> 
  </v-card>

</template>

<script setup lang="ts">
  import { StockStatementElement } from '@/api/types';
  import { useStockStore } from '@/store/stock';
  import { computed, onMounted } from 'vue'

  type StatementTypes = 'type' |
  'asset' |
  'cash' |
  'current_asset' |
  'ebitda' |
  'equity' |
  'equity_non' |
  'gross_margin' |
  'liability' |
  'profit' |
  'profit_non' |
  'revenue'

  type StatementContents = {
    type: StatementTypes,
    chartData: number[]
  }

  const { statement, stock } = useStockStore()
  const loading = computed(() => !statement.loading && !stock.loading)
  const statementData = computed(() => statement.data)

  const label = computed(() => statement.data.date)

  const statementContents = computed(() => {
    const keys = Object.keys(statement.data.data[0]).slice(1) as StatementTypes[]
    return keys.map((key: StatementTypes): StatementContents => ({
      type: key,
      chartData: statement.data.data.map(v => v[key] as number)
    }))
  })

  onMounted(() => {
    
  })


</script>

<style scoped>

</style>