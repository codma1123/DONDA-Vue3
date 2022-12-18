<template>
  <transition name="fade" :duration="3300">
    <v-card 
      class="CardLayout" 
      color="cardlayout" 
      elevation="0"
      v-if="loading"
      @click="goRoute"
    >
      <v-card-title class="innerTitle">        
        <div class="d-flex justify-center">
          <v-chip label variant="text">
            <v-icon start class="mr-3">
              mdi-chart-gantt
            </v-icon>

            적정주가
          </v-chip>
          <div class="ml-11">             
          </div>
        </div>    
      </v-card-title>      
      <v-card-actions>
        <div class="innerMore">
          적정주가 확인하기
        </div>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const { stockEvaluation, stock } = useStockStore()

  const loading = computed(() => !stockEvaluation.loading && !stock.loading)

  const goRoute = () => router.push(`/stock/${stock.data.code}/evaluation`)

  

</script>

<style scoped lang="scss">
.CardLayout {
  height: 200px;
}

.innerTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.innerMore {
  position: absolute;
  right: 20px;  
  bottom: 12px;
  font-size: 10px;
  opacity: .8;
  cursor: pointer;
}

.fade-enter-active {
  .innerTitle {
    transition: all 0.3s ease-in-out;  
    transition-delay: .45s;
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