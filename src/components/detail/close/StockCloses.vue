<template>
  <v-divider />
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
</template>

<script setup lang="ts">
  import { StockType } from '../../../models/stock';
  import { ref, onMounted, computed } from 'vue'
  
  const { stockData } = defineProps<{ stockData: StockType}>()

  const appear = ref<boolean>(false)
  const expandToggle = ref<boolean>(false)

  const priceFormat = (price: number) => '₩' + Number(price.toFixed(0)).toLocaleString()
  const volumeFormat = (price: number) => Number(price.toFixed(0)).toLocaleString()

  const computedChanges = computed<string>(() => {
    const change = stockData.changes
    return change > 0 ? '+' + change.toLocaleString() : '₩' + change.toLocaleString()
  })

  const computedChangeRatio = computed<string>(() => {
    const changes_ratio = stockData.changes_ratio as number
    return changes_ratio > 0 ? '+' + changes_ratio.toLocaleString() : '' + changes_ratio.toLocaleString()
  })

  onMounted(() => {
    appear.value = false
    setTimeout(() => { appear.value = true }, 1000)
  })


</script>

<style scoped>
.date {
  position: absolute;
  right: 0px;
  font-size: 12px;
  opacity: .5;
  margin-top: 10px;
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

.price {
  width: 180px;
}
</style>