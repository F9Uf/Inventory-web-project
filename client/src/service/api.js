import axios from 'axios'
import config from './config'

const $axios = axios.create({
    baseURL: config.API_BASE_URL,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('access_token') || ''
    }
  })
  
export default $axios