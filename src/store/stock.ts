import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useStockStore = defineStore('stock', () => {
  const test = ref<string>('test')

  const computedTest = computed<string>(() => 'computedTest')

  return {
    test,
    computedTest
  }
})