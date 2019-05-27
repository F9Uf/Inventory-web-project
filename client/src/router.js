import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import { checkTokenExpire } from './service/validateToken'
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
      path: '/cars',
      name: 'cars',
      component: () => import('./views/Cars/CarPage.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/cars/new',
      name: 'newCar',
      component: () => import('./views/Cars/NewCarPage.vue'),
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
      component: () => import('./views/Auth/LoginPage.vue'),
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
      path: '/shipping',
      name: 'shipping',
      component: () => import('./views/ShippingPage.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('./views/Employees/EmployeesPage.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/employees/:id',
      name: 'viewEmployee',
      component: () => import('./views/Employees/ViewEmployee.vue'),
      meta: {
      requireAuth: true
      }
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: () => import('./views/Suppliers/SupplierPage.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/suppliers/new',
      name: 'newSupplier',
      component: () => import('./views/Suppliers/NewSupplierPage.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.requireAuth)
  const requireNoAuth = to.matched.some(record => record.meta.requireNoAuth)

  const token = localStorage.getItem('access_token')
  const validToken = checkTokenExpire( token || '') ? token : null

  if (requireAuth && !validToken) {
    store.dispatch('Auth/logout')
    next('/login')
  } else if (requireNoAuth && validToken) {
    next('/')
  } else {
    next()
  }


})


export default router;


