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
  },
  {
    path: '/rank',
    component: () => import('../pages/Rank.vue'),
    children: [
      {
        path: ':rankType',
        component: () => import('../components/rank/RankContent.vue'),
      }
    ]
  },
  {
    path: '/detail/:code',
    component: () => import('../pages/Detail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router