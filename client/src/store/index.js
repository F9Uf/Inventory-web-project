import Vue from 'vue'
import Vuex from 'vuex'

// import modules
import AuthUserModule from './modules/AuthUserModule'

Vue.use(Vuex)

const modules = {
  AuthUser: AuthUserModule
}

export default new Vuex.Store({
  modules
})
