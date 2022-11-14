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
        /** If a character has a seperate stat page use the above otherwise this route will handle it until a specific stat page is made**/
        path     : '/character/:character',
        component: () => import('pages/StatPage.vue'),
      }
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
    path     : '/register',
    meta     : {mustBeLoggedOut: true},
    component: () => import('pages/RegisterPage.vue')
  },
  {
    path     : '/login',
    meta     : {mustBeLoggedOut: true},
    component: () => import('pages/LoginPage.vue')
  },
  {
    path     : '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
