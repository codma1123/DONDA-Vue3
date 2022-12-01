<template>  
  <v-layout>    
    <v-main class="d-flex justify-center">
      <v-sheet 
        class="Home overflow-y-auto mt-5 d-flex flex-column align-center justify-center" 
        rounded="xl"
        :width="MAIN_WIDTH" 
        :height="MAIN_HEIGHT" 
      >
        <router-view></router-view>
      </v-sheet>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { useLayout } from './mixins/layout';

const { MAIN_WIDTH, MAIN_HEIGHT } = useLayout()
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
}
</style>
