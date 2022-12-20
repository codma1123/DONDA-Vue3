<template>
  <transition>
    <v-card 
      v-if="loading && !_.isEmpty(statementData)"
      class="CardLayout"
      color="cardlayout"
    >
      {{ labels[0] }}
      {{ datas[0 ]}}
    </v-card>
  </transition>

</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue';
  import _ from 'lodash'
import { StatementType } from '@/models/stock';


  const { statement, stock } = useStockStore()

  const loading = computed<boolean>(() => !statement.loading && !stock.loading)
  const statementData = computed<StatementType>(() => statement.data)
  const labels = computed<string[]>(() => statement.data.date)
  const datas = computed<any>(() => statement.data.data)
  
  const error = computed(() => statement.error)

</script>

<style scoped>

</style>