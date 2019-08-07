// 封装一个插件
// 注册所有components下的组件为全局组件

// 导入组件
import MyBread from '@/components/my-bread.vue'
// vue 插件  暴露一个对象 对象中有一个选项 install
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
