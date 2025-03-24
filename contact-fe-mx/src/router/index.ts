import { createRouter, createWebHistory } from 'vue-router'
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
          component: () => import('@/contacts/presentation/ListView.vue'),
        },
        {
          path: '/create',
          name: 'contact-create',
          component: () => import('@/contacts/presentation/CreateView.vue'),
        },
        {
          path: '/:contactId',
          name: 'contact-detail',
          component: () => import('@/contacts/presentation/DetailView.vue'),
        },
        {
          path: '/:contactId/update',
          name: 'contact-update',
          component: () => import('@/contacts/presentation/UpdateView.vue'),
        },
        {
          path: '/:contactId/permissions',
          children: [
            {
              path: '',
              name: 'permission-list',
              component: () => import('@/permissions/presentation/ListView.vue'),
            },
            {
              path: 'create',
              name: 'permission-create',
              component: () => import('@/permissions/presentation/CreateView.vue'),
            },
            {
              path: ':permissionId',
              name: 'permission-detail',
              component: () => import('@/permissions/presentation/DetailView.vue'),
            },
            {
              path: ':permissionId/update',
              name: 'permission-update',
              component: () => import('@/permissions/presentation/UpdateView.vue'),
            },
          ],
        },
      ],
    },
  ],
})

export default router
