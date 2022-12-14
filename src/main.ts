
import VueNumber from 'vue-number-animation'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import router from './router'
import { Chart, registerables } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'

const pinia = createPinia()
Chart.register(...registerables, zoomPlugin);

loadFonts()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(vuetify)
app.use(VueNumber)
app.mount('#app')

app.directive('font-size', (el, binding) => {
  el.style.fontSize = binding.value + 'px'
})