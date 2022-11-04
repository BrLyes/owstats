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
      },
    ],
  },
  {
    path     : '/',
    meta     : {requiresAuth: true},
    component: () => import('layouts/EmptyLayout.vue'),
    children : [
      {
        path     : '/download-tracker',
        component: () => import('pages/DownloadTracker.vue'),
      }
    ],
  },
  {
    path: '/register',
    meta     : {mustBeLoggedOut: true},
    component: () => import('pages/RegisterPage.vue')
  },
  {
    path: '/login',
    meta     : {mustBeLoggedOut: true},
    component: () => import('pages/LoginPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path     : '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
