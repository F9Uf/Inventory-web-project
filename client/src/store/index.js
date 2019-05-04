import Vue from 'vue'
import Vuex from 'vuex'

// import modules
import AuthModule from './modules/AuthModule'
import UiModule from './modules/UiModule'

Vue.use(Vuex)

const modules = {
  Auth: AuthModule,
  UI: UiModule
}

export default new Vuex.Store({
  modules
})
