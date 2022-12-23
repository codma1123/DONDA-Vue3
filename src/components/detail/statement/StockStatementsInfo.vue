<template>

  <v-divider />

  <div v-if="loading">
    <v-sheet
      class="CardLayout" 
      color="cardlayout"
      elevation="0"
      v-for="statementContent in statementContents" :key="statementContent.type"
    >
      <v-card-title>
        {{ statementContent.type }}
      </v-card-title>
      <v-card-text>
        {{ statementContent.chartData }}
      </v-card-text>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed, onMounted } from 'vue'
  import _ from 'lodash'

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
    type: StatementTypes | string,
    chartData: number[]
  }

  const banish = ['equity_non', 'profit_non']

  const { statement, stock } = useStockStore()
  const loading = computed(() => !statement.loading && !stock.loading)

  const statementContents = computed<StatementContents[]>(() => {
    const keys = Object.keys(statement.data.data[0]).slice(1) as StatementTypes[]
    const removedKeys = keys.filter(key => !banish.includes(key))
    
    return removedKeys.map((key: StatementTypes): StatementContents => ({
      type: toPascalCase(key),
      chartData: statement.data.data.map(v => v[key] as number)
    }))

  })

  const toPascalCase = (type: string): string => type
    .replace(/(^\w|_\w)/g, text => text.replace(/_/, '').toUpperCase())

</script>

<style scoped>
.CardLayout {
  border-radius: 5px;
}

</style>