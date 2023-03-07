<template>
  <v-divider />

  <v-card class="" elevation="0">    
    <div class="date"> 기준일 : {{ date }}</div>

    <v-card-text class="d-flex">
      <div>
        <v-card-subtitle class="closeIcon" @click="push(`/detail/${stock.data.code}/close`)">
          현재 주가 <v-icon size="small">mdi-information</v-icon>
        </v-card-subtitle>
    
        <v-card-text v-font-size="35">
          <number 
            :from="0"
            :to="props.close"
            :format="priceFormat"
            :duration="1.2"
            :delay="0"
            easing="Power4.easeOut"
          />
        </v-card-text>        
      </div>

      <div>
        <v-card-subtitle>
          적정 주가      
        </v-card-subtitle>

        <v-card-text v-font-size="35">
          <number 
            :from="0"
            :to="props.evaluationClose"
            :format="priceFormat"
            :duration="1.4"
            :delay="0"
            easing="Power4.easeOut"
          />
        </v-card-text>
      </div>
    </v-card-text>

  </v-card>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'
  import { useRouter } from 'vue-router';

  interface EvaluationInfoProp {
    close: number
    evaluationClose: number
  }

  const props = defineProps<EvaluationInfoProp>()

  const { stock } = useStockStore()
  const router = useRouter()

  const date = computed(() => stock.data.date)  

  const push = (link: string) => router.push(link)
  const priceFormat = (price: number) => '₩' + Number(price.toFixed(0)).toLocaleString()
  
</script>

<style scoped lang="scss">
.date {
  position: absolute;
  right: 0px;
  font-size: 12px;
  opacity: .5;
  margin-top: 10px;
}

.EvaluationChartSheet {
  position: absolute;
  right: 5px;
  top: 40px;
  width: 200px;
  gap: 3rem;
  height: 110px;
  font-size: 30px;
  text-align: center;  
  font-weight: bold;
}

.informationArea {
  display: flex;
  align-items: start;
  span {
    margin-left: .25rem;
    opacity: .6;
  }
  margin-top: 5px;
}

.closeIcon {
  cursor: pointer;
  transition: all .3s ease;
  &:hover {
    opacity: 1 !important;
  }
}


</style>