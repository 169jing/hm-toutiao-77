import Vue from 'vue'
import App from './App.vue'

// 组件库  相当于（插件）
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//  @ 是某一个路径别名 src路径别名 在vue-cli创建的项目下才可使用
// 目录下有默认索引文件 index.js 就是索引文件 .js .vue .json
import router from '@/router'
import '@/style/index.less'
import axios from '@/api'

// 自己插件使用
import myCom from '@/components'
Vue.use(myCom)

Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

// main.js 的职责
//  1 导入项目需要依赖的资源（js包 css文件 其他资源）
//  2 创建一个根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
