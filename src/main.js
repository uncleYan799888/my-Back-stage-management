import i18n from './i18n/i18n'
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

// Vue.prototype.$http = router
// let hasMenus = false
router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('token')
  // 如果已经登录，那我不干涉你，让你随便访问
  if (token) {
    //如果菜单栏为空，根据token获取
      if (!store.state.permission.permissionList) {
        store.dispatch('permission/FETCH_PERMISSION',token).then(() => {
          //next传参,当前路由废止，进入参数对应路由
          console.log('a',to.path)
          next({...to,replace:true})
        })
      } else {
        console.log('permissionList',store.state.permission.permissionList)
        console.log('b',to.path)
        next()
      }
  } else {
        if (to.path !== '/login') {
            next({path: '/login'})
        } else {
            next()
        }
  }
})

new Vue({
  router,
  store,
  axios,
  i18n,
  render: h => h(App)
}).$mount('#app')
