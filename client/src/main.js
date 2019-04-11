import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Axios from 'axios'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Vue.prototype.$http = Axios
const token = localStorage.getItem('access_token')

if (token) {
  // Vue.prototype.$http.defaults.headers.common['Authorization'] = token
  store.dispatch('AuthUser/fetchUser')
  
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
