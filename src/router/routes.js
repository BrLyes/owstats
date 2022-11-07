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
        /** Specific character stage page, this is intended to be used when a character has seperate stats to track like dynamite dmg/kills for ashe etc...**/
        path     : '/character/ashe',
        component: () => import('pages/AsheStat.vue'),
      },
      {
        /** If a character has a seperate stat page use the above otherwise this route will handle it until a specific stat page is made**/
        path     : '/character/:character',
        duplicateNavigationPolicy: 'reload', // other options: 'ignore' and 'reject'
        component: () => import('pages/GenericStat.vue'),
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
