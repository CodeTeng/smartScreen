import axios from 'axios'
import { getCookie } from './cookie'
const service = axios.create({
  // baseURL: 'https://api-hmzs.itheima.net/v1',
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = getCookie()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
