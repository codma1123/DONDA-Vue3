<template>
  <v-card    
    class="MarketCard"
    :width="CONTENT_WIDTH"      
    color="cardlayout"      
  >
    <div>
      <div v-font-size="20" class="ml-5 mt-5"> 
        {{ title }}
      </div> 
      <div class="ml-5">
        <span v-font-size="20"> 
          {{ content.close }} 
        </span>
        <span v-font-size="17" :class="['ml-3', content.colorClass]"> 
          {{ content.prefixer}}{{ content.changes}}
        </span>
      </div>
    </div>

    <v-card-text class="d-flex flex-column align-end">
      <v-chip-group 
        selected-class="text-secondary"
        v-model="chipSelect"
        mandatory
      >        
        <v-chip label size="small">1주</v-chip>   
        <v-chip label size="small">2주</v-chip>   
        <v-chip label size="small">한달</v-chip>   
      </v-chip-group>


      <MarketSmallChart 
        :id="title"
        :chartData="chartData"
        :duration="chipSelect"        
      />
    </v-card-text>      
    
  </v-card>
</template>

<script setup lang="ts">
  import { useLayout } from '@/mixins/layout';
  import { MarketValues } from '@/models/stock';
  import { ComputedMarket } from '@/pages/Market.vue';  
  import { ref } from 'vue';
  import MarketSmallChart from './MarketSmallChart.vue';


  interface MarketCardProp {
    title: string
    content: ComputedMarket
    chartData: MarketValues
  }

  const { CONTENT_WIDTH } = useLayout()
  const { content, chartData, title } = defineProps<MarketCardProp>()

  const chipSelect = ref<number>(0)


</script>

<style scoped lang="scss">
$margin-size : 1rem;
.MarketCard {  
  padding: 0px !important;
  min-height: 160px;

  margin: $margin-size;
  display: flex;
  align-items: start;
  cursor: default;
  overflow: hidden;      
}

</style>