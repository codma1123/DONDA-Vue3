<template>
  <transition name="fade" :duration="2400">
    <v-card
      v-if="(!loading && data)"
      class="CardLayout"
      color="cardlayout"
      elevation="0"
      @click="goRoute"
    >      
      <v-card-title class="innerTitle">        
        <div class="d-flex justify-center">
          <v-chip label variant="text">
            <v-icon start class="mr-3" :color="trend.color" :icon="trend.icon" />
            종가
          </v-chip>
          <div class="ml-11">             
            {{ priceFormatter.format(data.close) }}
          </div>
        </div>
        <div v-if="enableLink" class="innerMore">
          주가 흐름 확인하기
        </div>
        <div v-if="label" class="innerMore" v-font-size="15">
          {{ label }}
        </div>
      </v-card-title>
    </v-card>
  </transition>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'
  import { priceFormatter } from '@/mixins/tools';
  import { useRoute, useRouter } from 'vue-router';
    
  const { stock } = useStockStore()
  const data = computed(() => stock.data)
  const loading = computed(() => stock.loading)
  const route = useRoute()
  const router = useRouter();

  const { enableLink = false, label } = defineProps<{ enableLink?: boolean, label?: string }>()

  const trend = computed<{ icon: string, color: string}>(() => {
    const isHighVal = data.value.changes > 0
    return {
      icon: isHighVal ? 'mdi-trending-up' : 'mdi-trending-down',
      color: isHighVal ? 'red' : 'blue'
    }
  })

  
  
  const goRoute = () => enableLink && router.push(route.fullPath + '/close')

</script>

<style lang="scss" scoped>

.fade-enter-active {
  .innerTitle {
    transition: all 0.3s ease-in-out;  
    transition-delay: .35s;
  }
}
</style>