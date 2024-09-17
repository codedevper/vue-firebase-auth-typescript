import { useAuthStore } from '@/stores/auth';

const redirectToHomeOnLoggedIn = (to: any, from: any, next: any) => {
  if (useAuthStore().isLoggedIn) next({ name: 'account' });
  else next();
};

const auth = [
  {
    path: '/auth/signup',
    name: 'auth-signup',
    component: () => import('@/views/auth/SignUp.vue'),
    beforeEnter: redirectToHomeOnLoggedIn
  },
  {
    path: '/auth/signin',
    name: 'auth-signin',
    component: () => import('@/views/auth/SignIn.vue'),
    beforeEnter: redirectToHomeOnLoggedIn
  },
  {
    path: '/auth/signout',
    name: 'auth-signout',
    component: () => import('@/views/auth/SignOut.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/auth/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    beforeEnter: redirectToHomeOnLoggedIn
  },
  {
    path: '/auth/reset-password',
    name: 'auth-reset-password',
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/auth/verify-email',
    name: 'auth-verify-email',
    component: () => import('@/views/auth/VerifyEmail.vue'),
    meta: { requireAuth: true }
  }
];

export default auth;
