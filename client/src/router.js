import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/HomePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/AboutPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginPage.vue')
    },
    {
      path: '/items',
      name: 'item',
      component: () => import('./views/ItemPage.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('./views/OrderPage.vue')
    }
  ]
})

/** @todo #1 make route secure:Ex. when login can not access 'login page'  */