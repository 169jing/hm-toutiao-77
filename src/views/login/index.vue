<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:236px;margin-right: 10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="login" type="primary" style="width: 100% ">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import axios from 'axios'
import store from '@/store'
export default {
  data () {
    // 自定义效验规则 声明效验函数 在return之前 element-ui提供
    const checkMobile = (rule, value, callback) => {
      // 效验手机号
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    // 绘制表单依赖的数据
    return {
      loginForm: {
        mobile: '15703484001',
        code: '246810'
      },
      // 表单效验规则数据
      loginRules: {
        mobile: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入正确的验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行效验  调用element-ui中 form 表单组件提供的方法 validate
      // this.$refs.loginForm.validate(async valid => {
      // if (valid) {
      // alert('效验success')
      // 请求登录接口
      /* this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            // res 响应对象  响应主体
            .then(res => {
              // 存储用户信息
              store.setUser(res.data.data)
              // 登录成功跳转去首页
              this.$router.push('/')
            })
            // catch请求失败的时候调用的方法
            .catch(() => {
              // 错误提示  Element-UI消息提示 提供
              this.$message.error('手机号或验证码错误')
            }) */
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const {
              data: { data }
            } = await this.$http.post(
              'authorizations',
              this.loginForm
            )
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.box-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto 20px;
  }
}
</style>
