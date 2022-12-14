<template>
  <transition name="fade" :duration="2400">
    <v-card
      v-if="(!loading && data)"
      class="CardLayout"
      color="cardlayout"
      elevation="2"
      @click="goRoute"
    >      
      <v-card-title class="innerTitle">        
        <div class="d-flex align-center">
          <v-icon class="mr-3" :color="trend.color" :icon="trend.icon" />
          <span class="ml-4">             
            {{ priceFormatter.format(data.close) }}
          </span>
        </div>
        <div class="innerMore">
          주가 흐름 확인하기
        </div>        
      </v-card-title>
    </v-card>
  </transition>
</template>

<script setup lang="ts">
  import { useStockStore } from '../../store/stock';
  import { computed } from 'vue'
  import { priceFormatter } from '../../mixins/tools';
  import { useRoute, useRouter } from 'vue-router';
    
  const { stock } = useStockStore()
  const data = computed(() => stock.data)
  const loading = computed(() => stock.loading)
  const route = useRoute()
  const router = useRouter();

  const trend = computed<{ icon: string, color: string}>(() => {
    const isHighVal = data.value.changes > 0
    return {
      icon: isHighVal ? 'mdi-trending-up' : 'mdi-trending-down',
      color: isHighVal ? 'red' : 'blue'
    }
  })

  const goRoute = () => router.push(route.fullPath + '/close')

</script>

<style lang="scss" scoped>
.innerMore {
  text-align: end;
  top: 25px;
  right: 10px;  
  font-size: 10px;
  opacity: .8;
  cursor: pointer;
}

.innerTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fade-enter-active {
  .innerTitle {
    transition: all 0.3s ease-in-out;  
    transition-delay: .25s;
  }

  .innerMore {
    transition: opacity 0.3s ease-in-out;
    transition-delay: 1s;
  }
}

.fade-enter-from {
  .innerTitle {
    transform: translateX(30px);
    opacity: 0;
  }

  .innerMore {
    opacity: 0;
  }
}

// leave
.fade-leave-active {
  .innerTitle {
    transition: all 0.3s ease-in-out;
  }

  .innerMore {
    transition: opacity 0.3s ease-in-out;
  }
}

.fade-leave-to {
  .innerTitle {
    transform: translateX(30px);
    opacity: 0;
  }

  .innerMore {
    transform: translateY(30px);
    opacity: 0;
  }
}
</style>