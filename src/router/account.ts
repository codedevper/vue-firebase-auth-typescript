const account = [
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/account/DashBoard.vue'),
    meta: { requireAuth: true }
  }
];

export default account;
