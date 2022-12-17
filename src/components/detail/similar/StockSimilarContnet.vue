<template>
  <v-card 
    class="CardLayout" color="cardlayout" elevation="0"
    @click="goRoute"
  >
    <v-card-title> {{ similarContent.name}} </v-card-title>
    <v-card-subtitle> {{ similarContent.code}} </v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
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
  margin-top: 12px;

  &:first-child {
    margin-top: 3px;
  }
}
</style>