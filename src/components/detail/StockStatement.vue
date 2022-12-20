<template>
  <transition>
    <v-card 
      v-if="loading && !_.isEmpty(statementData)"
      class="CardLayout"
      color="cardlayout"
    >
      {{ labels }}
    </v-card>
  </transition>

</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue';
  import _ from 'lodash'


  const { statement, stock } = useStockStore()

  const loading = computed<boolean>(() => !statement.loading && !stock.loading)
  const statementData = computed(() => statement.data)
  const labels = computed(() => [...Object.keys(statement.data).reverse()])
  
  const error = computed(() => statement.error)

</script>

<style scoped>

</style>