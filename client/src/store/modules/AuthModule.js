import { $api } from '@/service/api'
import { checkTokenExpire } from '@/service/validateToken'

const AuthModule = {
  namespaced: true,
  state: {
    token: checkTokenExpire(localStorage.getItem('access_token') || '') ? localStorage.getItem('access_token'):'',
    user: null
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    SETTOKEN (state, token) {
      state.token = token
    },
    SETUSER (state, payload) {
      state.user = payload
    }
  },
  actions: {
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        commit('SETTOKEN', '')
        commit('SETUSER', null)
        // $axios.defaults.headers.common['Authorization'] = ''
        resolve()
        reject()
        localStorage.removeItem('access_token')
      })
    },


    login ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {

        $api({path: '/login', method: 'post', data: payload})
        .then(resp => {

          if (resp.success) {
            localStorage.setItem('access_token', resp.token)
            commit('SETTOKEN', resp.token)
            dispatch('fetchUser', resp.token)
            .then(user=> {
              if (user) {
                commit('SETUSER', user)
              } else {
                console.log('error in login store')
              }
            })
            .catch(err => {
              console.log(err)
              dispatch('logout')
              reject(err)
            })
            resolve(resp)
          } else {
            reject(resp)
          }

        })
        .catch(error => {
          reject(error)
        })

      })
    },

    fetchUser (_cotext, token) {
      // $axios.defaults.headers.common['Authorization'] = token
      return new Promise((resolve, reject) => {
        const decode = JSON.parse(window.atob(token.split('.')[1]))
        $api({path: `/employees/${decode._id}`, method: 'get'})
        .then(resp => {
          if (resp.success) {
            resolve(resp.result)
          } else {
            reject(resp.message)
          }
        })
        .catch(err => {
          console.log(err)
          reject(err)
          // Haven't found any error this catch yet
        })
      })

    }
  }
}

export default AuthModule
