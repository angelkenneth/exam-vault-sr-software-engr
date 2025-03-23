import { createRouter, createWebHistory } from 'vue-router'
import ListView from '@/contacts/presentation/ListView.vue'
import SessionGuard from '@/session/presentation/SessionGuard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'session',
      component: SessionGuard,
      children: [
        {
          path: '/',
          name: 'contact-list',
          component: ListView,
        },
      ],
    },
  ],
})

export default router
