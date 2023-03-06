import { h, VNode } from "vue"
import { VCardTitle, VCardSubtitle, VCardText } from "vuetify/components"

const contentsObj = {
  '저평가': {
    title: '저평가? 고평가?',
    text: h(VCardText, () => '어쩌구 저쩌구..')
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
    h(
      VCardSubtitle,
      { class: 'dialog-subtitle' },
      () => text
    )
  ]
}

export default EvaluationDialogContents