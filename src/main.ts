import { createApp, CreateAppFunction, VueElement } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import router from './router'

const pinia = createPinia()

loadFonts()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(vuetify)
app.mount('#app')

app.directive('font-size', (el, binding) => {
  el.style.fontSize = binding.value + 'px'
})