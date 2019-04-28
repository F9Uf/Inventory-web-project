import axios from 'axios'
import config from './config'

export const $api = ({ path, method, ...args}) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('access_token') || ''

    if (token) {
      axios.defaults.headers.common['Authorization'] = token
    }

    try {
      axios({
        method: method || 'get',
        url: `${config.VUE_APP_API_BASE_URL}${path}`,
        ...args
      })
      .then(resp => {
        resolve(resp.data)
      })
      .catch(error => {
        reject(error)
      })
    } catch (err) {
      reject(new Error(err))
    }

  })

}
