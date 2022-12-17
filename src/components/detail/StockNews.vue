<template>
  <v-card    
    elevation="0"
    v-if="!loading"
  > 
    <StockNewsContent 
      v-for="(content, i) in contents"
      :key="i"
      :content="content"
    />
    
    <div class="d-flex justify-center align-center">
      <ProgressCircular v-if="contentCountLoad" class="mb-2 mt-4"/>      
      <Observer v-if="contentCountLoad" @triggerIntersected="loadMore"/>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed, ref } from 'vue';

  import StockNewsContent from '@/components/detail/StockNewsContent.vue';
  import ProgressCircular from '@/components/global/ProgressCircular.vue';
  import Observer from '@/components/global/Observer.vue';

  const contentsCount = ref<number>(6)
  const contentCountLoad = ref<boolean>(true)

  const { news } = useStockStore()
  const contents = computed(() => news.data?.slice(0, contentsCount.value))
  const loading = computed(() => news.loading)

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