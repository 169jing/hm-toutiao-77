<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数"></el-table-column>
        <el-table-column label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?"正常" : "关闭"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="!scope.row.comment_status"
              size="small"
              type="success"
            >打开评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else size="small" type="danger">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
      <!-- <el-pagination background layout="prev, pager, next" :total="total"></el-pagination> -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 10,
        response_type: 'comment'
      },
      comments: [],
      total: 0
    }
  },
  created () {
    this.getComments()
  },

  methods: {
    //   内容列表、
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    // 分页逻辑
    changePager (newPage) {
      // 拿到向后台的传参  并向后台发送请求
      this.reqParams.page = newPage
      //   再重新跟新列表
      this.getComments()
    },
    // 切换 打开 关闭评论
    async toggleStatus (row) {
      const {
        // 代码右边是请求的数据，左边是接收后台返回数据
        // article_id=${row.id} 请求参数 （请求头）{
        // {allow_comment: !row.comment_status} 请求参数（请求体）

        data: { data }
      } = await this.$http.put(`comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      this.$message.success(
        data.allow_comment ? '打开评论成功' : '关闭评论成功'
      )
      //   修改当前状态  更新列表
      row.comment_status = data.allow_comment
    }
  }
}
</script>

<style scoped lang='less' >
</style>
