import $axios from '../../service/api'

const AuthModule = {
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

            dispatch('fetchUser', token)

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

    async fetchUser ({ commit }, token) {
      try {
        const decode = await JSON.parse(window.atob(token.split('.')[1]))
        const { data } = await $axios.get(`/employees/${decode._id}`)

        if (data.success) {
          commit('SETUSER', await data.result)
        }

      } catch (err) {
        console.log(err)
      }

    }
  }
}

export default AuthModule
