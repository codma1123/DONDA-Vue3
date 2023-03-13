import { VChip } from "vuetify/components"
import { ComponentInternalInstance, h, VNode } from 'vue'

type ChipType = '분기'


const ChipTypeMap: Record<ChipType, () => VNode> = {
  '분기': () => h('p', '분기')
}

interface IndicatorChipProp {
  chipType: ChipType
}

const defaultChipAttrs = {
  class: 'ml-2',
  size: 'small',
  label: true
}

const IndicatorChip = (props: IndicatorChipProp, context: ComponentInternalInstance): VNode  => {    
    const content = ChipTypeMap[props.chipType]    
    
    return h(VChip, defaultChipAttrs, content)
}

export default IndicatorChip