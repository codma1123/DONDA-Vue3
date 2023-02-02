import { defineStore } from "pinia";
import { DefineComponent, reactive, ref, toRef } from "vue";
import { VSheet } from "vuetify/components";

export const useAppStore = defineStore('app', () => {
  const target = ref<DefineComponent<VSheet> | null>(null)
  return { 
    target
  }
})