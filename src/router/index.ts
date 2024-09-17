import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import HomeView from '../views/pages/HomeView.vue';
import auth from './auth';
import account from './account';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/pages/AboutView.vue')
    },
    ...auth,
    ...account
  ]
});

router.beforeEach((to: any, from: any, next: any) => {
  const authStore = useAuthStore();
  if (to.meta.requireAuth && !authStore.isLoggedIn) {
    next({ name: 'auth-signin' });
  } else next();
});

export default router;
