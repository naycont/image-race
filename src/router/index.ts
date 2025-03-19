import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/race',
      name: 'race',
      component: () => import('@/views/RaceView.vue')
    },
    {
      path: '/admin/sellers',
      name: 'sellers',
      component: () => import('@/views/admin/SellersView.vue')
    }
  ]
})

export default router
