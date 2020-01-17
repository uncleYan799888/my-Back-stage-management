import {fetchPermission} from '../../api/permission/api'
import router, { asyncRouterMap } from '@/router/index'
import asyncRouter from '@/router/asyncRouter'
import {createRoutes,setDefaultRoute} from '@/utils/createRoutes'
export default {
  namespaced: true,
  state: {
    text: 'permission',
    permissionList: null,//所有路由
    sidebarMenu:null,//主页导航
    userInfo:null
  },
  getters: {},
  mutations: {
    set_menu(state, menu) {
      state.sidebarMenu = menu
    },
    save_permissionList(state, routes) {
      state.permissionList = routes
    },
    save_userInfo(state, data) {
      state.userInfo = data
    }
  },
  actions: {
    async FETCH_PERMISSION({ commit, state },token) {
      let result = await fetchPermission(token)
      //result.data.data[0],result.data.menu
      console.log('rusult', result)
      let userInfo = result.data.data[0]
      let menus = result.data.menu
      let routes = createRoutes(menus)
      // let MainContainer = asyncRouterMap.find(v => v.path === '')
      // let children = MainContainer.children
      // console.log('children',children)
      // children.push(...routes)
      // routes.foreach(e => {
      //   console.log('e',e)
      // })
      // setDefaultRoute([MainContainer])
      console.log('routes', routes)
      router.options.routes = routes
      router.addRoutes(routes)
      commit('set_menu',menus)
      commit('save_userInfo',userInfo)
      commit('save_permissionList',routes)
    }
  }
}