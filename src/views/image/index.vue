<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" style="float:right" size="small" @click="openDialog">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="foot" v-show="!reqParams.collect">
            <span
              @click="toggleCollect(item)"
              class="el-icon-star-off"
              :class="{selected:item.is_collected}"
            ></span>
            <span @click="deleteImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 列表分页 -->
      <el-pagination
        v-if="total > reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 提交参数
      reqParams: {
        // 默认全部
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      // 总条数
      total: 0,
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 上传成功后的图片的地址
      imageUrl: null,
      // 请求头数据
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    // 获取素材列表
    this.getImages()
  },
  methods: {
    // 删除图片
    deleteImage (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    },
    // 添加收藏 取消收藏
    async toggleCollect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 提示
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功 ')
      // 更新当前图片状态
      item.is_collected = data.collect
    },
    // 上传成功组件
    handleSuccess (res) {
      // 1获取图片地址显示在img标签上
      // console.log(res)
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeput(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)

      // 2 提示上传成功
      // 3 过2s 后关闭对话框，更新列表
    },
    // 打开对话框
    openDialog () {
      // 打开前清空对话框
      // this.imageUrl = null
      this.dialogVisible = true
    },
    // 收藏分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.img_list {
  margin-top: 20px;
  .img_item {
    position: relative;
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      line-height: 30px;
      text-align: center;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
