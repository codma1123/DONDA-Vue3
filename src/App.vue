<template>  
  <v-layout>    
    <v-main class="d-flex justify-center align-center">
      <v-sheet 
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
  import { onMounted, ref } from 'vue';
  import { useLayout } from './mixins/layout';
  import NavBar from './pages/NavBar.vue'
  import { getMarketValuation, getRank, getTodayMarket } from './store/payload';
  import { useStockStore } from './store/stock';

  const { MAIN_WIDTH, MAIN_HEIGHT } = useLayout()
  const { request } = useStockStore()
  const isNav = ref<boolean>(true)

  onMounted(() => {
    request(getTodayMarket())
    request(getMarketValuation())
    request(getRank())
  })


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

.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}



</style>
