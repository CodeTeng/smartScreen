import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // hash模式
  // history: createWebHashHistory()
  // history模式
  // import.meta.env.BASE_URL 路由前加的地址
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/bigScreen',
      component: HomeView
    },
    {
      path: '/bigScreen',
      name: 'BigScreen',
      component: () => import('@/views/BigScreenView.vue')
    }
  ]
})

export default router
