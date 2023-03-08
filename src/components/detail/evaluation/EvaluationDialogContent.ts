import { h, VNode } from "vue"
import { VCardTitle, VCardText, VDivider } from "vuetify/components"

const contentsObj = {
  '저평가': {
    title: '저평가? 고평가?',
    text: h('div', [
      h('div', '저평가라면, 현재 기업의 주가가 적정 주가에 비해 낮게 책정된것으로 판단됩니다.'),
      h('div', { class: 'mt-3' }, '고평가라면, 현재 기업의 주가가 적정 주가에 비해 높게 책정된것으로 판단됩니다.')
    ])
  },
  '상승여력': {
    title: '상승여력? 하락여럭?',
    text: h('div', [
      h('div', '상승 여력 수치만큼 주가가 상승할 가능성이 있습니다..'),
      h('div', { class: 'mt-3' }, '하락 여럭 수치만큼 주가가 하락할 가능성이 있습니다.')
    ])
  }
} as const

export type DialogType = keyof typeof contentsObj


interface EvaluationDialogContentProp {
  contentType: DialogType | undefined
}

const EvaluationDialogContents = ({ contentType }: EvaluationDialogContentProp): VNode[] | VNode | null => {
  if(typeof contentType === 'undefined') return null
  
  const {title, text} = contentsObj[contentType]

  return [
    h(
      VCardTitle,
      { class: 'dialog-title' },
      () => title
    ),
    h(VDivider),
    h(
      VCardText,
      { class: 'dialog-subtitle' },
      () => text
    )
  ]
}

export default EvaluationDialogContents