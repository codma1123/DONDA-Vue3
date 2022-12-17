<template>
  <v-card 
    class="CardLayout" color="cardlayout" elevation="0"
    @click="goRoute"
  >
    <v-card-text class="d-flex align-end justify-space-between">
      <div>
        <span v-font-size="20" class="font-weight-bold"> {{ similarContent.name }} </span>
        <span v-font-size="13" class="code"> {{ similarContent.code }} </span>
      </div>
      <div>
        <span v-font-size="20"> 
          {{ priceCompactFormatter.format(similarContent.close) }}
        </span>
        <span v-font-size="12">
          ({{ similarContent.changes > 0 ? '+' + similarContent.changes : similarContent.changes }})
        </span>
      </div>
    </v-card-text>
    
  </v-card>
</template>

<script setup lang="ts">
import { priceCompactFormatter } from '@/mixins/tools';
import { useRouter } from 'vue-router';


  interface SimilarContent {
    changes: number;
    changes_ratio: number;
    close: number;
    code: string;
    evaluation_score: number;
    market: string;
    name: string;
  }

  const router = useRouter()

  const { similarContent } = defineProps<{ similarContent: SimilarContent }>()
  const goRoute = () => router.push(`/detail/${similarContent.code}`)

</script>

<style scoped lang="scss">
.CardLayout {
  margin: 0px;
  margin-top: 10px;
  max-height: 35px !important;

  &:first-child {
    margin-top: 3px;
  }
}

.code {
  opacity: .8;
  margin-left: 10px;
}
</style>