<template>
  <div class="DetailLayout">
    <div v-if="!stock.loading">
      {{ stock.data }}
    </div> 
    <ProgressCircular v-else absolute />
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStockStore } from '../store/stock';
  import { getStock } from '../store/payload'
  import ProgressCircular from '../components/global/ProgressCircular.vue';


  const route = useRoute()
  
  const { request, stock } = useStockStore()  

  onMounted(() => {
    const code = route.params.code as string
    request(getStock(code))
  })

</script>

<style scoped lang="scss">

$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}
</style>