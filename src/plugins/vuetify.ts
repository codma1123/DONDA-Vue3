// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#fff'
  }
}

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    theme: {
      defaultTheme: 'light',
      themes: {
        // dark: {
        //   dark: true,
        //   colors: {
        //     cardlayout: '#333333'
        //   }
        // }
      }
    }
  }
)
