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
    }
  ]
})
