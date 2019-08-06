// 存储用户信息的时候
// 1 约定好信息的KEY是什么  hm-toutiao-77-user
// 2 存储信息的值是什么  用户对象  字符串格式json
const KEY = 'hm-toutiao-77-user'

export default {
  setUser (user) {
    // 存值
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取用户信息从 sessionStrorage中
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
