<template>
  <v-card-title v-if="!stock.loading" class="d-flex justify-space-between"> 
    <div>
      <span v-font-size="30" class="font-weight-bold"> {{ stockData.name }} </span>
      <span v-font-size="15" class="ml-2"> {{ stockData.code }} </span>
    </div>
    <v-btn icon variant="text" @click="iconToggle = !iconToggle">
      <v-icon class="Icon">{{icon}}</v-icon>
    </v-btn>
  </v-card-title>
</template>

<script setup lang="ts">
  import { useStockStore } from '../../store/stock';
  import { computed, ref } from 'vue'

  const { stock } = useStockStore()
  const stockData = computed(() => stock.data)
  const iconToggle = ref<boolean>(false)

  const icon = computed(() => iconToggle.value ? 'mdi-bookmark' : 'mdi-bookmark-outline')  
</script>

<style lang="scss" scoped>
.Icon {
  transition: all 1s ease-in-out;
}
</style>
