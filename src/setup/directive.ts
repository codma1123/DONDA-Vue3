import { VueElement } from "vue"

export const directve = {
  onMounted: (el: VueElement, binding: any) => {
    el.style.fontSize = binding + 'px'
  }
}