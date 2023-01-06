<template>
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