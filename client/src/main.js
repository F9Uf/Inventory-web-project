import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import $axios from './service/api'
import { checkTokenExpire } from './service/validateToken'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Vue.prototype.$http = Axios
const token = localStorage.getItem('access_token')

// if (token) {
//   // Vue.prototype.$http.defaults.headers.common['Authorization'] = token
//   // $axios.defaults.headers.common['Authorization'] = token
//   // store.dispatch('AuthUser/fetchUser', token)
//   // store.dispatch('AuthUser/fetchUser', token)

// }

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: function (h) { return h(App) },
  beforeCreate() {
    if (token) {
      const decode = JSON.parse(window.atob(token.split('.')[1]))
      console.log(decode.exp);

      console.log(new Date().getTime());

    }

    if (token && checkTokenExpire(token)) {
      store.dispatch('Auth/fetchUser', token)
      .then(user => {
        store.commit('Auth/SETUSER', user)
      })
      .catch(err => {
        console.log(err)
        store.dispatch('Auth/logout')
      })
    } else {
      store.dispatch('Auth/logout')
    }
  },
}).$mount('#app')




