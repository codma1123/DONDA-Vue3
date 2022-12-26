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
    component: Market,    
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
    component: () => import('../pages/Detail.vue'),    
  },
  {
    path: '/detail/:code/close',
    component: () => import('../pages/detail/Close.vue')
  },
  {
    path: '/detail/:code/similar',
    component: () => import('../pages/detail/Similar.vue')
  },
  {
    path: '/detail/:code/evaluation',
    component: () => import('@/pages/detail/Evaluation.vue')
  },
  {
    path: '/detail/:code/statement',
    component: () => import('@/pages/detail/Statement.vue')
  },
  {
    path: '/detail/:code/news',
    component: () => import('@/pages/detial/News.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router