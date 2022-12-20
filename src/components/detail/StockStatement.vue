<template>
  <transition name="fade" :duration="2200">
    <v-card       
      class="CardLayout"
      color="cardlayout"
      v-if="loading"
    >
      <v-card-title class="innerTitle">        
        <div class="d-flex justify-center">
          <v-chip label variant="text">
            <v-icon start class="mr-3" icon="mdi-cash-register"/>
            재무제표
          </v-chip>          
        </div>
        <div class="innerMore">
          재무제표 자세히보기
        </div>

      </v-card-title>            
    </v-card>    
  </transition>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue';
  import _ from 'lodash'
  import { StatementType } from '@/models/stock';
  import ProgressCircular from '../global/ProgressCircular.vue';


  const { statement, stock } = useStockStore()

  const loading = computed<boolean>(() => !statement.loading && !stock.loading)
  const statementData = computed<StatementType>(() => statement.data)
  const labels = computed<string[]>(() => statement.data.date)
  const datas = computed<any>(() => statement.data.data)
  
  const error = computed(() => statement.error)

</script>

<style scoped lang="scss">
.CardLayout {  
}

.fade-enter-active {
  .innerTitle {
    transition: all 0.3s ease-in-out;  
    transition-delay: .35s;
  }
}
</style>