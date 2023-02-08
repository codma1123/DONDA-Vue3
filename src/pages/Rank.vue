<template>
  <div v-if="!rank.loading">
    <div class="Title">
      <v-card-title v-font-size="25">
        순위 별 종목
      </v-card-title>
      <v-card-subtitle> 다양한 기준으로 정렬된 종목을 살펴보세요.</v-card-subtitle>
    </div>

    <v-chip-group
      v-model="selectedTag"
      mandatory        
      selected-class="text-secondary"
      class="vChipGroup"
    >
      <v-chip                 
        class="vChip" 
        v-for="tag in tags"          
        label
        :key="tag"
        :value="tag"
      >
        {{ tag }}
      </v-chip>
    </v-chip-group>
    
    <v-card
      v-for="(content, i) in contents"
      class="RankContent"        
      color="cardlayout"
      height="90"
      :widtd="CONTENT_WIDTH"
      :key="i"
      @click="push(content.code)"
      elevation="0"
    >
      <v-card-subtitle v-font-size="15" class="mt-2"> {{ content.market }} </v-card-subtitle>
      <div class="d-flex align-end justify-space-between">
        <v-card-title> 
          <span v-font-size="23"> {{ i + 1 }}</span>
          <span v-font-size="18" class="pl-2"> {{ content.title }} </span>            
        </v-card-title>        
        <div class="mr-3 mb-2"> 
          <div>
            <span v-font-size="20"> 
              {{ content.close }}  
            </span>
            <span class="ml-1" v-font-size="12"> 
              {{ content.prefix }}{{ content.change }}
            </span>
          </div>
        </div>
      </div>    
    </v-card>

    <div :class="CENTER_CLASS">      
      <ProgressCircular v-if="rankCountLoad" class="mb-2"/>      
      <Observer v-if="rankCountLoad" @triggerIntersected="triggerIntersected"/>
    </div>
  </div>
  <ProgressCircular absolute v-else />
</template>

<script setup lang="ts">
  import {  computed, ref, watch } from 'vue';
  import { useLayout } from '@/mixins/layout';
  import { useStockStore } from '@/store/stock';
  import ProgressCircular from '@/components/global/ProgressCircular.vue'
  import Observer from "@/components/global/Observer.vue";
  import { RankType } from '@/models/stock';
  import { useRouter } from 'vue-router';

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
  const { CONTENT_WIDTH, CENTER_CLASS } = useLayout()   
  const router = useRouter()

  const rankCount = ref(RANK_INIT_COUNT)
  const rankCountLoad = ref<boolean>(true)
  const tags = ref<TagType[]>(['시가총액', '거래량', '상승률', '하락률'])
  const selectedTag = ref<TagType>('시가총액')
  const currentSortType = ref<(keyof RankType)>('marcap')

  const contents = computed(() => rank.data[currentSortType.value].slice(0, rankCount.value))

  const push = (code: string) => { 
    router.push(`/detail/${code}`)
  }

  watch(selectedTag, (v: TagType) => {    
    rankCount.value = 10
    currentSortType.value = marketMapping[v]
    router.push(`/rank/${currentSortType.value}`)    
  })

  const createEffectLoading = (loadTime: number) => (callback: () => unknown, examine: () => unknown) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if(!examine()) reject()
      resolve(callback())
    }, loadTime)
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
    const k = await effectLoading()
  }
    
</script>

<style scoped lang="scss">

  $margin: 1rem;
  .Title {
    margin-top: 55px;
    margin-left: 15px;
  }

  .RankContent {
    margin: $margin;
    margin-top: 2px;
    padding-top: 5px;
      
    border-radius: .5rem;

    cursor: pointer;

    &:nth-child(2n) {
      background-color: #424242 !important;
    }

    &:hover {
      background-color: lighten(#333333, 10%) !important;
    }        
  }

  .vChipGroup {
    display: flex;
    justify-content: center;
    margin: $margin;
    margin-bottom: 0px;
    flex-grow: auto;
  }


</style>