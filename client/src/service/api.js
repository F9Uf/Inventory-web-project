import axios from 'axios'
import config from './config'

const $axios = axios.create({
    baseURL: config.apiBaseURL,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('access_token') || ''
    }
  })
  
export default $axios