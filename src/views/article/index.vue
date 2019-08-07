<template>
  <div class="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParms.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="reqParms.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-itme>
          <el-button type="primary" style="margin-left:80px">筛选</el-button>
        </el-form-itme>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <!-- <my-test> -->
    <!-- slot="content" 指定插槽 -->
     <!-- slot-scope="scope" scope是slot插槽上所有的自定义属性的集合{msg:'my-test的数据'} -->
    <!-- <template v-slot:content="scope">{{scope.msg}}</template> -->
    <!-- </my-test> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选项表单
      reqParms: {
        status: null,
        channel_id: null
      },
      // 频道下拉数据
      channelOption: [{ value: 1, label: 'js' }],
      // 日期数据
      dateArr: []
    }
  }
}
</script>

<style>
</style>
