<template>
  <div v-if="(!market.loading && !marketValuation.loading && !rank.loading)">
    <v-card
      :width="CONTENT_WIDTH"
      height="120"
      class="MarketCard"
      theme="dark"
      color="cardlayout"
      elevation="0"
    >
      <v-card-title> 시장 동향 </v-card-title>
      <v-card-subtitle> 주식 시장이 어떻게 변하고 있는지 알아보세요. </v-card-subtitle>      
      <v-btn       
        class="vBtn"  
        variant="text"
        @click="$router.push('/market')" 
        icon="mdi-chevron-right"
      />
    </v-card>

    <v-card
      :width="CONTENT_WIDTH"
      height="130"
      class="MarketCard"      
      theme="dark"   
      color="cardlayout"   
      elevation="0"
    >
      <v-card-title> 추천 종목 </v-card-title>
      <v-card-subtitle class="vCardSubtitle"> DONDA 가 기업 가치가 상대적으로 저평가된 종목들을 추천해줍니다.</v-card-subtitle>
      <v-btn       
        class="vBtn"  
        variant="text"
        @click="$router.push('/market')" 
        icon="mdi-chevron-right"
      />
    </v-card>
    
    <div class="d-flex justify-space-between mt-8 align-end">
      <v-card-title class="ml-3" v-font-size="16">
        시가총액이 높은 기업들입니다.
      </v-card-title>      
      <v-btn 
        variant="plain" 
        v-font-size="12" 
        class="mr-2"
        @click="$router.push('/rank')"
      >
        자세히..
      </v-btn>
    </div>

    <v-card          
      v-for="(rankContent, i) in marcap"
      :key="i"
      :width="CONTENT_WIDTH"
      height="90"
      class="MarketCard"      
      theme="dark"
      color="#333333"
      elevation="0"
      @click="$router.push(`/detail/${rankContent.code}`)"
    >
      <v-card-subtitle v-font-size="15" class="mt-2"> 
        {{ rankContent.market }} 
        {{ rankContent.code }}
      </v-card-subtitle>
      <div class="d-flex align-end justify-space-between">
        <v-card-title v-font-size="20"> 
          <div>
            {{ rankContent.title }}            
          </div>          
        </v-card-title>        
        <div class="mr-3 mb-2"> 
          <span v-font-size="23"> 
            {{ rankContent.close }}
          </span>
          <span class="ml-1" v-font-size="12"> 
            {{ rankContent.prefix }}{{ rankContent.change }}
           </span>
        </div>
      </div>            
    </v-card> 

    <div :class="CENTER_CLASS">      
      <ProgressCircular v-if="rankCountLoad" class="mb-2"/>      
      <Observer v-if="rankCountLoad" @triggerIntersected="loadMore"/>
    </div>

  </div>    
  <ProgressCircular absolute v-else />
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue"
  import { useLayout } from "@/mixins/layout";
  import { useStockStore } from "@/store/stock"
  import Observer from "@/components/global/Observer.vue";

  import ProgressCircular from "@/components/global/ProgressCircular.vue";

  const emit = defineEmits<{ (e: 'mount'): void }>()

  const { market, marketValuation, rank } = useStockStore()
  const { CONTENT_WIDTH, CENTER_CLASS } = useLayout()

  const rankCount = ref<number>(8)
  const rankCountLoad = ref<boolean>(true)

  const marcap = computed(() => rank.data.marcap.slice(0, rankCount.value))

  onMounted(() => {
    emit('mount')
  })

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

<style lang="scss" scoped>

$margin-size : 1rem;
.MarketCard {  
  margin: $margin-size;
  padding-top: 10px;
  border-radius: .5rem;
          
  transition: all .5s ease-in-out;
  cursor: pointer;


  &:first-child {
    margin-top: 55px;
    cursor: default;
  }

  &:nth-child(3) {
    margin-top: 20px;
  }

    
  .vCardSubtitle {
    white-space: normal;
    word-break: normal;
  }
}

.vBtn {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }


</style>
