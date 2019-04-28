import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

//components
import Home from './views/HomePage.vue'
import Setting from './views/SettingPage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/AboutPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginPage.vue'),
      meta: {
        requireNoAuth: true
      }
    },
    {
      path: '/items',
      name: 'item',
      component: () => import('./views/ItemPage.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('./views/OrderPage.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/AboutPage.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.requireAuth)
  const requireNoAuth = to.matched.some(record => record.meta.requireNoAuth)

  const token = localStorage.getItem('access_token')

  if (requireAuth && !token) {
    next('/login')
  } else if (requireNoAuth && token) {
    next('/')
  } else {
    next()
  }


})


export default router;


