<template>
  <transition name="fade" :duration="1200">
    <v-card 
      v-if="(!loading && data)"
      class="CardLayout"
      color="cardlayout"
      elevation="2"
      @click="goRoute"
    >    
      <v-card-title class="innerTitle">
        <div class="d-flex align-center">
          <v-icon class="mr-3">mdi-office-building-outline</v-icon>
          <span class="ml-4">             
            {{ priceCompactFormatter.format(data.marcap) }}
          </span>
        </div>
        <div class="innerMore">
          비슷한 기업 보기
        </div>
      </v-card-title>
      
    </v-card>
  </transition>
</template>

<script setup lang="ts">

  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { priceCompactFormatter } from '../../mixins/tools';
  import { useStockStore } from '../../store/stock';

  const { stock } = useStockStore()
  const router = useRouter()

  const data = computed(() => stock.data)
  const loading = computed(() => stock.loading)

  const goRoute = () => router.push(`/detail/${stock.data.code}/similar`)

</script>

<style scoped lang="scss">
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


// enter
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