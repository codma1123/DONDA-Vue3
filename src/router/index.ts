import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from '../pages/Home.vue'
import Market from '../pages/Market.vue'

const routes = [
  {
    path: '/', 
    component: Home,
  },
  {
    path: '/market',
    component: Market
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router