<template>  
  <v-layout>    
    <v-main class="d-flex justify-center">
      <v-sheet 
        class="Home overflow-y-auto mt-5 d-flex flex-column align-center justify-start" 
        color="primary"
        rounded="xl"
        :width="MAIN_WIDTH" 
        :height="MAIN_HEIGHT" 
      >
        <NavBar />
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-sheet>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { useLayout } from './mixins/layout';
import NavBar from './pages/NavBar.vue'

const { MAIN_WIDTH, MAIN_HEIGHT } = useLayout()
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
}

.Home {
  z-index: 1;
}
</style>
