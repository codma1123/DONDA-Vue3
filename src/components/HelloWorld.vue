<template>  
  <v-sheet class="d-flex align-center justify-center flex-column">
    <v-sheet height="100" width="100vw" color="error" class="d-flex justify-center align-center">
      <v-progress-circular :value="20" v-if="loading"></v-progress-circular>
      <div v-if="data">
        {{ data }}
      </div>
    </v-sheet>
  </v-sheet>
</template>
 
<script setup lang="ts">
import { onMounted, toRefs } from 'vue';
import { getStock } from '../store/payload';
import { useStockStore } from '../store/stock';

const { stock, requestTest } = useStockStore()
const { data, loading, error } = toRefs(stock)

onMounted( () => {
  requestTest(getStock('005930'))
})



</script>
