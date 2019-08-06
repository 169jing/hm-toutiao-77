//  配置一个axios  导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
/* axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
} */
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // config 配置项
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 进行导出
export default axios
