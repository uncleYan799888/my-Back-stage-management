import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
// router.prototype.$http = router
window.router=router

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// Vue.prototype.$http = router
router.beforeEach((to, from, next) => {
  // let token = localStorage.getItem('token')
  // let token = store.state.userAccount
  let token = window.sessionStorage.getItem('token')
  // 如果已经登录，那我不干涉你，让你随便访问
  if (token) {
    // 已登录，就根据token获取用户信息
    store.dispatch('getInfo', token)
    next()
  } else {
    if (to.path !== '/login') {
      // 如果没有登录，但你访问其他需要登录的页面，那我就让你跳到登录页面去
      next({path: '/login'})
    } else {
      // 如果没有登录，但你访问的login，那就不干涉你，让你访问
      next()
    }
  }
})

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
