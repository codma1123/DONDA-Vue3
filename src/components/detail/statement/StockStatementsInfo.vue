<template>

  <v-divider />

  <div v-if="loading">
    <v-card
      class="CardLayout"       
      elevation="0"
      v-for="(statementContent, index) in statementContents"
      @click="expands[index] = !expands[index]"
      :key="statementContent.type"       
    >
      <v-card-title v-font-size="35" class="font-weight-bold">
        {{ statementContent.type }}
      </v-card-title>

        <StockStatementSimpleChart 
          :type="statementContent.type"
          :propKey="statementContent.type" 
          :labels="labels"
          :chartData="statementContent.chartData"
        />


      <v-expand-transition>
        <div v-show="expands[index]">
          <v-divider></v-divider>

          <v-card-text>
            expand contents
          </v-card-text>
        </div>
      </v-expand-transition>

    </v-card>
    
  </div>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed, onMounted, ref } from 'vue'
  import _ from 'lodash'
  import * as utils from '@/utils'
  import StockStatementSimpleChart from '@/components/detail/statement/StockStatementSimpleChart.vue';
  import { useCustomRouter } from '@/mixins/customRouter';

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
    expand: boolean
  }

  const banish = ['equity_non', 'profit_non']


  const { statement, stock } = useStockStore()
  const { push } = useCustomRouter()

  const loading = computed(() => !statement.loading && !stock.loading && !_.isEmpty(statement.data))
  const labels = computed<string[]>(() => [...statement.data.date.reverse()])
  const expands = ref<boolean[]>([])

  const statementContents = computed<StatementContents[]>(() => {
    const keys = Object.keys(statement.data.data[0]).slice(1) as StatementTypes[]
    const removedKeys = keys.filter(key => !banish.includes(key))

    expands.value = keys.map(_ => false)

    return removedKeys.map((key: StatementTypes): StatementContents => ({
      type: utils.toPascalCase(key),
      chartData: [...statement.data.data.map(v => v[key] as number).reverse()],
      expand: false
    }))

  })



</script>

<style scoped>
.CardLayout {
  border-radius: 5px;
}

.ChartLayout {
  
}

</style>