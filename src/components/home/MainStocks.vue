<template>
  <div>
    <!-- Title -->
    <MainStockTitle />
  
    <!-- Contents -->
    <MainStock 
      v-for="rankContent in marcap"
      :rankContent="rankContent"
      :key="rankContent.code"
    />
  
    <div :class="CENTER_CLASS">      
      <ProgressCircular v-if="rankCountLoad" class="mb-2"/>      
      <Observer v-if="rankCountLoad" @triggerIntersected="loadMore"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useLayout } from '@/mixins/layout'
  import { useStockStore } from '@/store/stock'
  import { RankContent } from '@/models/stock'
  
  import MainStockTitle from '@/components/home/MainStockTitle.vue'
  import MainStock from '@/components/home/MainStock.vue'
  import ProgressCircular from "@/components/global/ProgressCircular.vue"
  import Observer from "@/components/global/Observer.vue"

  const { rank } = useStockStore()
  const { CENTER_CLASS } = useLayout()

  const rankCount = ref<number>(8)
  const rankCountLoad = ref<boolean>(true)

  const marcap = computed<RankContent[]>(() => rank.data.marcap.slice(0, rankCount.value))
    
  const loadMore = (): void => { 
    if (rankCount.value > 44) {
      rankCountLoad.value = false
      return
    }

    new Promise(resolve => {
        setTimeout(() => {
        rankCount.value += 5 
        resolve(rankCount.value)
      }, 500)      
    })
  }

  

</script>

<style scoped>

</style>