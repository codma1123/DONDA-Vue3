<template>  
  <v-layout>    
    <v-main class="d-flex justify-center align-center">
      <v-sheet 
        id="scroll-target"
        v-scroll:#scroll-target="onScroll"
        class="overflow-y-auto mt-5" 
        theme="dark"
        rounded="xl"
        :width="MAIN_WIDTH" 
        :height="MAIN_HEIGHT" 
      >
      <router-view v-slot="{ Component }">
          <NavBar v-if="isNav"/>
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-sheet>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { ref, VueElement } from 'vue';
import { useLayout } from './mixins/layout';
import NavBar from './pages/NavBar.vue'

const { MAIN_WIDTH, MAIN_HEIGHT } = useLayout()
const isNav = ref<boolean>(true)
const onScroll = (e: any) => true


</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
}
body {
  background-color: #111111;
  font-family: 'Hahmlet', serif;
  font-family: 'Noto Sans KR', sans-serif;
  font-family: 'Poppins', sans-serif;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all .5s ease;
}



</style>
