<template>
  <el-select clearable v-bind:value="value" @change="fn" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
// computed 计算属性使用场景：当你需要一个新数据，需要依赖data中的数据。
// watch 侦听器的使用场景：当你需要监听某一个属性的变化，去做一些开销较大操作(异步操作)
/*  watch: {
    'reqParams.channel_id': function (newVal, logVal) {
      console.log(newVal)

      if (newVal === '') {
        this.reqParams.channel_id = null
      }
    }
  }, */

// 处理数据为空的字符

// 频道下拉数据
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      //   myValue: '',
      // 频道下拉数据
      channelOptions: []
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getChannelOptions()
  },
  methods: {
    // 获取频道列表数据
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 频道列表数据
      this.channelOptions = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="less">
</style>
