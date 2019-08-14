// 封装一个插件
// 注册所有components下的组件为全局组件

// 导入面包屑组件
import MyBread from '@/components/my-bread.vue'

// 注册（导入）频道组件
// import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
import MyImage from '@/components/my-image.vue'
// vue 插件  暴露一个对象 对象中有一个选项 install
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
