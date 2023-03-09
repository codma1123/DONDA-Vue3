<template>
  <div class="DetailLayout" v-if="loading">
    <StockTitle />

    <v-divider />

    <StockNewsContent 
      v-for="(content, i) in contents.slice(0, contentsCount)"
      :key="i"
      :content="content"
    />
    
    <div class="d-flex justify-center align-center">
      <ProgressCircular v-if="contentCountLoad" class="mb-2 mt-4"/>      
      <Observer v-if="contentCountLoad" @triggerIntersected="loadMore"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock'
  import { computed, onMounted, ref } from 'vue'
  import StockNewsContent from '@/components/detail/StockNewsContent.vue'
  import ProgressCircular from '@/components/global/ProgressCircular.vue'
  import StockTitle from '@/components/detail/StockTitle.vue'
  import Observer from '@/components/global/Observer.vue';
  import { useAppStore } from '@/store/app'
  import { delayFunc } from '@/mixins/tools';

  const NEWS_CONTENTS_LENGTH = 8

  const { news, stock } = useStockStore()
  const { scrollReset } = useAppStore()

  const load = delayFunc(500)

  const contentsCount = ref<number>(NEWS_CONTENTS_LENGTH)
  const contentCountLoad = ref<boolean>(true)

  const loading = computed(() => !news.loading && !stock.loading)
  const contents = computed(() => news.data)

  const loadMore = (): void => {        
    if(contentsCount.value > news.data.length - 5) {
      contentCountLoad.value = false
      return
    }

    load(() => { contentsCount.value += 3 })
  }

  onMounted(() => scrollReset())

</script>
