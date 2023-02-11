<template>
  <div v-if="!rank.loading">
    <div class="Title">
      <v-card-title v-font-size="25">
        순위 별 종목
      </v-card-title>
      <v-card-subtitle> 다양한 기준으로 정렬된 종목을 살펴보세요.</v-card-subtitle>
    </div>

    <RankMenu v-model="selectedTag" />

    <RankContent 
      v-for="(content, i) in contents"
      :content="content"
      :key="i"
      :index="i"      
    />

    <div :class="CENTER_CLASS">      
      <ProgressCircular v-if="rankCountLoad" class="mb-2"/>      
      <Observer v-if="rankCountLoad" @triggerIntersected="triggerIntersected"/>
    </div>
  </div>
  <ProgressCircular absolute v-else />
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useLayout } from '@/mixins/layout'
  import { useStockStore } from '@/store/stock'
  import { useCustomRouter } from '@/mixins/customRouter'

  import useLoader from '@/mixins/loader'
  import ProgressCircular from '@/components/global/ProgressCircular.vue'
  import Observer from "@/components/global/Observer.vue"
  import RankContent from '@/components/rank/RankContent.vue'
  import RankMenu  from '@/components/rank/RankMenu.vue'

  type TagType = keyof (typeof marketMapping)
  
  const marketMapping = {
    '시가총액': 'marcap',
    '거래량': 'volume',
    '상승률': 'change_incr',
    '하락률': 'change_redu' 
  } as const

  const RANK_INIT_COUNT = 10
  const RANK_MAX_COUNT = 44
  const LOAD_TIME = 500

  const { rank } = useStockStore()
  const { CENTER_CLASS } = useLayout()   
  const { push } = useCustomRouter()
  const { createEffectLoading } = useLoader()

  const rankCount = ref(RANK_INIT_COUNT)
  const rankCountLoad = ref<boolean>(true)
  const selectedTag = ref<TagType>('시가총액')
  const currentSortType = computed(() => marketMapping[selectedTag.value])

  const contents = computed(() => rank.data[currentSortType.value].slice(0, rankCount.value))

  watch(selectedTag, () => {    
    rankCount.value = 10
    push(`/rank/${currentSortType.value}`)    
  })
   
  const loadRankCountCallback = () => rankCount.value += 5 
  const examineRankCount = () => {
    if (rankCount.value > RANK_MAX_COUNT) {
      rankCountLoad.value = false
      return false
    }
    return true
  }

  const effectLoading = () => createEffectLoading(LOAD_TIME)(loadRankCountCallback, examineRankCount)


  const triggerIntersected = async () => { 
    if (rankCount.value > 44) {
      rankCountLoad.value = false
      return
    }
    await effectLoading()
  }
    
</script>

<style scoped>  
  .Title {
    margin-top: 55px;
    margin-left: 15px;
  }
</style>