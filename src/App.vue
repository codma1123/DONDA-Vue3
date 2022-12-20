<template>  
  <v-layout>    
    <v-main class="d-flex justify-center align-center">
      <router-view v-slot="{ Component }">
        <NavBar v-if="isNav"/>
          <v-sheet 
            class="overflow-y-auto mt-5" 
            theme="dark"
            rounded="xl"
            :width="MAIN_WIDTH" 
            :height="MAIN_HEIGHT" 
            ref="target"
          >
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </v-sheet>
        </router-view>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  import { onMounted, ref, VueElement } from 'vue';
  import { useLayout } from './mixins/layout';
  import NavBar from './pages/NavBar.vue'
  import { getMarketValuation, getRank, getSearchTable, getTodayMarket } from './store/payload';
  import { useStockStore } from './store/stock';

  const { MAIN_WIDTH, MAIN_HEIGHT } = useLayout()
  const { request } = useStockStore()
  const isNav = ref<boolean>(true)
  const target = ref<Element>()  

  onMounted(() => {
    request(getTodayMarket())
    request(getMarketValuation())
    request(getRank())
    request(getSearchTable())
  })

</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
}
body {
  background-color: #111111;
  // font-family: 'Hahmlet', serif;
  font-family: 'Noto Sans KR', sans-serif;
  // font-family: 'Poppins', sans-serif;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all .3s ease;
}

.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}



</style>
