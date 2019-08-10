import VueRouter from 'vue-router'
import Vue from 'vue'
// 引入登录页组件
import Login from '@/views/login'
// 引入home首页组件
import Home from '@/views/home'
import Welcome from '@/views/welcome'

import Article from '@/views/article'
import Notfound from '@/views/404'
import Image from '@/views/image'
import Publish from '@/views/publish'

import store from '@/store'
// 使用router插件
Vue.use(VueRouter)
// 创建router实例对象
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish }

      ]
    },
    // 处理404页面
    { path: '*', name: '404', component: Notfound }

  ]
})

// 前置导航守卫  来自vue文档
router.beforeEach((to, from, next) => {
  // 1 判断是不是登录路由 是 放行
  // if (to.path === '/login') return next()
  // 2 判断是否登录 （有token值） 不是登录 去到登录页
  // if (!store.getUser().token) return next('/login')
  // 3 以上两种情况都不是  直接放行
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
