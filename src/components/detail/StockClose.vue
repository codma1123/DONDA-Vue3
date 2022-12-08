<template>
  <transition name="fade" :duration="850">
    <v-card 
      v-if="(!loading && data)"
      class="CardLayout"
      color="cardlayout"
      elevation="2"
    >    
      <v-card-title class="innerTitle">
        <v-icon class="mr-3">mdi-office-building-outline</v-icon>
        <span class="ml-2"> 
          {{ convertCompactPrice(data.marcap) }}
        </span>
      </v-card-title>
    </v-card>
  </transition>
</template>

<script setup lang="ts">

  import { computed } from 'vue';
  import { priceCompactFormatter } from '../../mixins/tools';
  import { useStockStore } from '../../store/stock';

  const convertCompactPrice = (price: number) => priceCompactFormatter.format(price)
  const { stock } = useStockStore()
  const data = computed(() => stock.data)
  const loading = computed(() => stock.loading)



</script>

<style scoped>

.innerTitle {
  display: flex;
  align-items: center;
}


.fade-enter-active .innerTitle,
.fade-leave-active .innerTitle {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from .innerTitle,
.fade-leave-to .innerTitle {
  transform: translateX(30px);
  opacity: 0;
}

.fade-enter-active {
  transition: all .5s ease;
}

.fade-enter-active .innerTitle {
  transition-delay: .25s;
}

</style>