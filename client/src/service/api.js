import axios from 'axios'
import config from './config'

export const $api = ({ path, method, ...args}) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('access_token') || ''

    if (token) {
      axios.defaults.headers.common['Authorization'] = token
    }

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Max-Age': 2592000,
      'Access-Control-Allow-Credentials': true,
    };

    try {
      axios({
        method: method || 'get',
        url: `${config.VUE_APP_API_BASE_URL}${path}`,
        ...args,
        headers
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
