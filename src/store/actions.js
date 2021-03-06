import { resolve, reject } from "_any-promise@1.3.0@any-promise"
import axios from 'axios'
const actions = {
  loginByUsername(state, userInfo) {
    const username = userInfo.account.trim()
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/login', {params: { account: userInfo.account, password: userInfo.password }}).then(res => {
        //匹配账号密码，登录成功返回一个token
        const data = res.data
        console.log('login', res)
        //将token存在本地
        window.sessionStorage.setItem('token', res.data.token)
      }).catch(err => {
        throw err
      })
        resolve()
    }).catch(error => {
      reject(error)
    })
  },
  getInfo(state, token) {
    // var rusult
    return new Promise((resolve, reject) => {
      //根据token获取用户信息
      axios.get('http://localhost:3000/getUserInfo', { params: { token: token } }).then(res => {
        // console.log('userinfo', res)
        //将用户信息存在vuex
        state.commit('saveUserInfo', res.data.data[0])
        //将侧边栏存在vuex
        // state.commit('saveMenus', res.data.menu)
        // console.log('actionMenu', res.data.menu)
        // rusult = res.data.menu
      })
      resolve('成功')
    }).catch(error => {
      reject(error)
    })
  }
}

export default actions