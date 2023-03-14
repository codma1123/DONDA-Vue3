import { VChip, VIcon } from "vuetify/components"
import { ComponentInternalInstance, h, VNode } from 'vue'

export type ChipType = '분기' | '하락' | '상승'

type ChipContent = {
  text: VNode | [VNode, VNode<Partial<VChip["$props"]>>]
  attrs?: Partial<VChip["$props"]>
}

const ChipTypeMap: Record<ChipType, ChipContent> = {
  '분기': {
    text: h('p', '분기'),
  },
  '하락': {
    text: [
      h('p', '하락'), 
      h(VIcon, { start: true, icon: 'mdi-trending-down', class: 'ml-1', color: 'blue' })
    ],
  },
  '상승': {
    text: [
      h('p', '상승'), 
      h(VIcon, { start: true, icon: 'mdi-trending-up', class: 'ml-1', color: 'red' })
    ],
  }
}

interface IndicatorChipProp {
  chipType: ChipType
}

const defaultChipAttrs: Partial<VChip["$props"]> = {
  class: 'ml-2',
  size: 'small',
  label: true
}

const IndicatorChip = (props: IndicatorChipProp, context: ComponentInternalInstance): VNode  => {    
    const { attrs, text } = ChipTypeMap[props.chipType]
    
    return h(
      VChip, 
      {
        ...attrs,
        ...defaultChipAttrs
      },
      () => text
    )
}

export default IndicatorChip