<template>
  <v-card
    :width="CONTENT_WIDTH"
    height="120"
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
      @click="push('/market')" 
      icon="mdi-chevron-right"
    />
</v-card>
</template>

<script setup lang="ts">
import { useCustomRouter } from '@/mixins/customRouter';
import { useLayout } from '@/mixins/layout';


  const { CONTENT_WIDTH } = useLayout()

  const { push } = useCustomRouter()

</script>

<style scoped>

</style>