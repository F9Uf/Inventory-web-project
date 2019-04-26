import Vue from 'vue'
import Vuex from 'vuex'

// import modules
import AuthModule from './modules/AuthModule'

Vue.use(Vuex)

const modules = {
  Auth: AuthModule
}

export default new Vuex.Store({
  modules
})
