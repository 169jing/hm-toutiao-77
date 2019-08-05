import VueRouter from 'vue-router'
import Vue from 'vue'
// 引入登录页组件
import Login from '@/views/login'
// 引入home首页组件
import Home from '@/views/home'
import Welcome from '@/views/welcome'

import Article from '@/views/article'
import Notfound from '@/views/404'
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
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article }

      ]
    },
    // 处理404页面
    { path: '*', name: '404', component: Notfound }

  ]
})
export default router
