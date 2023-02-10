import { ComponentInternalInstance, VNode, h } from "vue"
import { VChip } from "vuetify/components";

interface ChipProp {
  size: string
  content: string
}

export const Chip = (prop: ChipProp, context: ComponentInternalInstance): VNode => {
  return h(
    VChip,
    {
      class: 'Chip',
      size: prop.size
    },
    () => prop.content
  )
}