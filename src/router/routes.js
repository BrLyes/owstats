const routes = [
  {
    path     : '/',
    meta     : {requiresAuth: true},
    component: () => import('layouts/MainLayout.vue'),
    children : [
      {
        path     : '',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path     : '/ashe',
        component: () => import('pages/AsheStat.vue'),
      }
    ],
  },
  {
    path     : '/register',
    meta     : {mustBeLoggedOut: true},
    component: () => import('pages/RegisterPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path     : '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
