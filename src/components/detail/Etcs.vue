<template>
  <div class="d-flex justify-center">    
    <v-card 
      class="EtcCardLayout CardLayout"
      color="cardlayout"
      elevation="0"
      v-for="i in 2 "
      :key="i" 
      @click="push"
    >
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useCustomRouter } from '@/mixins/customRouter';


  const { push } = useCustomRouter()

</script>

<style scoped lang="scss">

  .EtcCardLayout {
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;

    &:nth-child(2) {
      margin-left: 20px;
    }
  }




</style>