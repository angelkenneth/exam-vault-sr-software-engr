import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../users/presentation/SignInView.vue'),
    },
    {
      path: '/sign-out',
      name: 'sign-out',
      component: () => import('../users/presentation/SignOutView.vue'),
    },
  ],
})

export default router
