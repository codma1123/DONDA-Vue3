import { defineStore } from "pinia";
import { reactive, ref, toRef } from "vue";

export const useAppStore = defineStore('app', () => {
  const target = ref<any | null>(null)
  return { 
    target
  }
})