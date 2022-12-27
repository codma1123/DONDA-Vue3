<template>
  <div class="DetailLayout">
    <div v-if="loading">

      <StockTitle />

      <v-divider />
      
      <StockNewsContent 
        v-for="(content, i) in contents"
        :key="i"
        :content="content"
      />
      
      <div class="d-flex justify-center align-center">
        <ProgressCircular v-if="contentCountLoad" class="mb-2 mt-4"/>      
        <Observer v-if="contentCountLoad" @triggerIntersected="loadMore"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock'
  import { computed, ref } from 'vue'
  import StockNewsContent from '@/components/detail/StockNewsContent.vue'
  import ProgressCircular from '@/components/global/ProgressCircular.vue'
  import StockTitle from '@/components/detail/StockTitle.vue'

  const { news, stock } = useStockStore()
  const contentsCount = ref<number>(3)
  const contentCountLoad = ref<boolean>(true)

  const loading = computed(() => !news.loading && !stock.loading)
  const contents = computed(() => news.data)

  const loadMore = (): void => {        
    if(contentsCount.value > news.data.length - 5) {
      contentCountLoad.value = false
      return
    }

    new Promise(resolve => {
        setTimeout(() => {
        contentsCount.value += 3
        resolve(contentsCount.value)
      }, 500)      
    })
  }



</script>

<style scoped>

</style>