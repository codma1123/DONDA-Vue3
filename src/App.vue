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
            ref="targetSheet"
          >
            <transition name="fade">
              <component :is="Component"/>
            </transition>
          </v-sheet>
        </router-view>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { DefineComponent, onMounted, ref } from 'vue';
  import { useLayout } from './mixins/layout';
  import NavBar from './pages/NavBar.vue'
  import { useAppStore } from './store/app';
  import { getMarketValuation, getRank, getSearchTable, getTodayMarket } from './store/payload';
  import { useStockStore } from './store/stock';
  import { VSheet } from "vuetify/components";

  const { MAIN_WIDTH, MAIN_HEIGHT } = useLayout()
  const { request } = useStockStore()
  const { target } = storeToRefs(useAppStore())

  const isNav = ref<boolean>(true)
  const targetSheet = ref<DefineComponent<VSheet> | null>(null)

  onMounted(() => {
    request(getTodayMarket())
    request(getMarketValuation())
    request(getRank())
    request(getSearchTable())
    target.value = targetSheet.value
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

// .fade-enter-from {
//   opacity: 0;
// }

// .fade-enter-to {
//   opacity: 1;
// }

// .fade-enter-active {
//   transition: all .1s ease;
// }

.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}



</style>
