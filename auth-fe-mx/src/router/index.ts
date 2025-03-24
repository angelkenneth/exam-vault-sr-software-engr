import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '@/users/presentation/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../users/presentation/RegisterView.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../users/presentation/SignInView.vue'),
    },
    {
      path: '/sign-out',
      name: 'sign-out',
      redirect: '/',
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../components/presentation/TestView.vue'),
    },
  ],
})

export default router
