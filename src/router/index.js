import VueRouter from 'vue-router'
import Vue from 'vue'
// 引入登录页组件
import Login from '@/views/login'
// 引入home首页组件
import Home from '@/views/home'
import Welcome from '@/views/welcome'
// 使用router插件
Vue.use(VueRouter)
// 创建router实例对象
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    }
  ]
})
export default router
