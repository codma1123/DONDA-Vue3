import { defineStore } from "pinia";
import { DefineComponent, ref } from "vue";
import { VSheet } from "vuetify/components";

export const useAppStore = defineStore('app', () => {

  // scroll
  const target = ref<DefineComponent<VSheet> | null>(null)
  const scrollReset = (): void => (target.value?.$el as HTMLElement).scrollTo({ top: 0 })
  
  return { 
    target, 
    scrollReset 
  }
})
