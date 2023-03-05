import { h, VNode } from "vue"
import { VCardTitle, VCardSubtitle } from "vuetify/components"

interface EvaluationDialogContentProp {
  contentType: string | Event
}

const EvaluationDialogContents = ({ contentType }: EvaluationDialogContentProp): VNode[] | VNode => {

  return [
    h(
      VCardTitle,
      {
        class: 'dialog-title'
      },
      () => contentType
    ),
    h(
      VCardSubtitle,
      {
        class: 'dialog-subtitle'
      },
      () => 'subtitle'
    )
  ]
}

export default EvaluationDialogContents