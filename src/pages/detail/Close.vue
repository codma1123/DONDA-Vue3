<template>
  <div class="DetailLayout">    

    <StockTitle />

    <v-divider />
  

    <!-- Close -->
    <v-card elevation="0" @click="expandToggle = !expandToggle">      
      <div class="date"> 기준일 : {{ stockData.date }}</div>
      <v-card-subtitle class="mt-2"> 종가</v-card-subtitle>
      <v-card-text class="mt-5">
        <span v-font-size="50">
          <number
            :from="0"
            :to="stockData.close"
            :format="priceFormat"
            :duration="1"
            :delay="0"
            easing="Power4.easeOut"
          />        
        </span>   
        <transition name="appear">
          <span v-if="appear">
            <span v-font-size="17" class="ml-2">
              {{ computedChanges }}
            </span>
            <span>
              ({{ computedChangeRatio }})
            </span>
          </span>
        </transition>
      </v-card-text>
      <v-expand-transition v-if="expandToggle">          
        <div class="d-flex flex-wrap">
          <div class="price">
            <v-card-subtitle> 고가 </v-card-subtitle>    
            <span v-font-size="28" class="ml-5">
              <number
                :from="0"
                :to="stockData.high"
                :format="priceFormat"
                :duration="2"
                :delay="0"
                easing="Power4.easeOut"
              />   
            </span>        
          </div>
          <div class="price">
            <v-card-subtitle> 저가 </v-card-subtitle>    
              <span v-font-size="28" class="ml-5">
                <number
                  :from="0"
                  :to="stockData.low"
                  :format="priceFormat"
                  :duration="2"
                  :delay="0"
                  easing="Power4.easeOut"
                />   
              </span>        
          </div>
          <div class="price">
            <v-card-subtitle class="mt-3"> 시가 </v-card-subtitle>    
              <span v-font-size="28" class="ml-5">
                <number
                  :from="0"
                  :to="stockData.open"
                  :format="priceFormat"
                  :duration="2.2"
                  :delay="0"
                  easing="Power4.easeOut"
                />   
              </span>        
          </div>
          <div class="price">
            <v-card-subtitle class="mt-3"> 거래량 </v-card-subtitle>    
            <span v-font-size="28" class="ml-5">
              <number
                :from="0"
                :to="stockData.volume"
                :format="volumeFormat"
                :duration="2.3"
                :delay="0"
                easing="Power4.easeOut"
              />   
            </span>        
          </div>
        </div>      
      </v-expand-transition>
      <v-divider class="mt-5"/>
    </v-card>


    <!-- CloseChart -->
    <StockCloseChart v-if="loading" :chartData="chartData" />

    <v-divider />


    <!-- Compare -->
    <v-sheet class="px-2 mt-5 d-flex flex-wrap justify-space-around">

      <div 
        v-for="(content, i) in comparePriceIterator"
        :key="i"
        class="mt-1 d-flex align-center mr-3 comparePriceWrapper"        
      >
        <div class="chipWarpper">
          <v-chip 
            :style="{ backgroundColor: content.comparePrice.per.includes('-') ? '#4169E1' : '#B22222'}"
            class="chip">{{ content.text }}</v-chip>
        </div>
        <div 
          class="textWrapper"
          
        >
          {{ content.comparePrice.per }}%
        </div>
      </div>

    </v-sheet>






  </div>
</template>

<script setup lang="ts">

  import { computed, ref, onMounted } from 'vue'  
  import StockCloseChart from '../../components/detail/close/StockCloseChart.vue';
  import { useStockStore } from '../../store/stock';
  import StockTitle from '../../components/detail/StockTitle.vue'

  interface IComparePrice {
    text: string
    per: string
  }

  interface IComparePriceIterator {
    text: string
    comparePrice: IComparePrice
  }

  /**
   * const
   */



  
  /**
   * custom hook
   */
  const { stockGraphAll, stock } = useStockStore()

  /**
   * state
   */
  const appear = ref<boolean>(false)
  const expandToggle = ref<boolean>(true)



  /**
   * computed
   */
  const chartData = computed(() => stockGraphAll.data)
  const loading = computed<boolean>(() => !stock.loading && !stockGraphAll.loading)
  const stockData = computed(() => stock.data)
  
  const computedChanges = computed<string>(() => {
    const change = stock.data.changes
    return change > 0 ? '+' + change.toLocaleString() : '₩' + change.toLocaleString()
  })

  const computedChangeRatio = computed<string>(() => {
    const changes_ratio = stock.data.changes_ratio as number
    return changes_ratio > 0 ? '+' + changes_ratio.toLocaleString() : '' + changes_ratio.toLocaleString()
  })

  const comparePriceIterator = computed<IComparePriceIterator[]>(() => [
    { text: '1주전 대비', comparePrice: comparePrice(7) },
    { text: '전달 대비', comparePrice: comparePrice(30) },
    { text: '전분기 대비', comparePrice: comparePrice(120) },
    { text: '전년 대비', comparePrice: comparePrice(360) },
  ])


  /**
   * method
   */
  const priceFormat = (price: number) => '₩' + Number(price.toFixed(0)).toLocaleString()
  const volumeFormat = (price: number) => Number(price.toFixed(0)).toLocaleString()

  const comparePrice = (target: number): IComparePrice => {
    const targetPrice = Object.values(chartData.value).at(target * (-1)) || 0
    const origin = stockData.value.close

    const text = targetPrice < origin ? '증가' : '감소'
    const per = ((origin - targetPrice) * 100 / origin).toFixed(1)
    return { text, per }    
  }

  

  /**
   * hook
   */
  onMounted(() => {
    appear.value = false
    setTimeout(() => {      
      appear.value = true
    }, 1000)
  })

  
  
</script>

<style scoped lang="scss">
$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}

.price {
  width: 180px;
}

.appear-enter-from {
  opacity: 0
}

.appear-enter-to {
  opacity: 1
}

.appear-enter-active {
  transition: all 1s ease-out;
}

.date {
  position: absolute;
  right: 0px;
  font-size: 12px;
  opacity: .5;
  margin-top: 10px;
}

.comparePriceWrapper {
  width: 150px;  
}

.chipWarpper {

  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;

  .chip {
    opacity: .95;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.textWrapper {
  padding: .25rem;
  min-width: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}




</style>