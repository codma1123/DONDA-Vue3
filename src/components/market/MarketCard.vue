<template>
  <v-card    
    class="MarketCard"
    :width="CONTENT_WIDTH"      
    color="cardlayout"      
  >
    <div v-font-size="30" class="ml-5 mt-5"> 
      {{ title }}
    </div>         
    <v-card-text class="d-flex flex-column align-end">
      <v-chip-group selected-class="text-secondary" v-model="chipSelect">
        
        <v-chip label size="small">1주전</v-chip>   
        <v-chip label size="small">2주전</v-chip>   
        <v-chip label size="small">한달전</v-chip>   
      </v-chip-group>
      <div class="mr-3">
        <span v-font-size="20"> 
          {{ content.close }} 
        </span>
        <span v-font-size="17" :class="['ml-3', content.colorClass]"> 
          {{ content.prefixer}}{{ content.changes}}
        </span>
      </div>
      <div>            
        <!-- 전주 대비 {{ marketValuation.data[i].weeklyTrend }}% -->
      </div>
    </v-card-text>      
  </v-card>
</template>

<script setup lang="ts">
  import { useLayout } from '@/mixins/layout';
  import { ComputedMarket } from '@/pages/Market.vue';
  import { ref } from 'vue';


  interface MarketCardProp {
    title: string
    content: ComputedMarket
  }

  const { CONTENT_WIDTH } = useLayout()
  const { content } = defineProps<MarketCardProp>()

  const chipSelect = ref<string | null>(null)
</script>

<style scoped lang="scss">
$margin-size : 1rem;
.MarketCard {  
  padding: 0px !important;
  margin: $margin-size;
  display: flex;
  height: 120px;
  align-items: start;
  cursor: default;
  overflow: hidden;      
}

</style>