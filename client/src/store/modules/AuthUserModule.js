import $axios from '../../service/api'

const AuthUserModule = {
  namespaced: true,
  state: {
    token: localStorage.getItem('access_token') || '',
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
        localStorage.removeItem('access_token')
        resolve()
      })
    },

    autoLogin ({commit}, token) {
      const decode = JSON.parse(window.atob(token.split('.')[1]))
      commit('SETUSER', {
        firstName: decode.firstName,
        lastName: decode.lastName,
        photoUrl: decode.photoUrl,
        id: decode._id,
        role: decode.role
      })
      
    },

    login ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {

        $axios.post('/login', payload, {validateStatus: status => true})
        .then(res => {
          
          if (res.data.success) {
            // if login successfully
            const token = res.data.token;
            localStorage.setItem('access_token', token)
            $axios.defaults.headers.common['Authorization'] = token
            commit('SETTOKEN', token)

            dispatch('autoLogin', token)

            resolve(res)

          } else {
            localStorage.removeItem('access_token')    
            reject(res)      
          }
        })
        .catch(err => {
          localStorage.removeItem('access_token')
          reject(err)
        })
      })
    },

    fetchUser ({ commit }, token) {     
      if (token) {
        const decode = JSON.parse(window.atob(token.split('.')[1]))
        $axios.get(`/employees/${decode.sub}`, {validateStatus: status => true})
          .then(res => {
            if (res.data.success) {
              commit('SETUSER', res.data.result)
            }
          })
          .catch(err => {
            console.log(err, 'from AuthUserModule.js')              
          })
      }
    }
  }
}

export default AuthUserModule