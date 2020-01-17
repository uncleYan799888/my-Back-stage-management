// import store from '../store/index'
import asyncRouter from '@/router/asyncRouter'

export function createRoutes(userRouter = []) {
  const result = []
  const children = []
  console.log('asyncRouter', asyncRouter)
  result.push({
    path: '/base',
    component: () => import('../views/base.vue'),
    children
  })
  userRouter.forEach(item => {
    generateRoutes(children,item)
  })
  result.push(
    {path: '*', redirect: '/base'},
)
  // allRouter.forEach((v, i) => {
  //     userRouter.forEach((item, index) => {
  //       if (item.name === v.name) {
  //         console.log('push', v)
  //             realRoutes.push(v)
  //       }
  //       if (item.children.length > 0) {
  //         createRoutes(item.children, allRouter)
  //     }
  //     })
  // })
  return result
}
function generateRoutes(children, item) {
  if (item.name) {
    console.log('item.name',asyncRouter[item.name])
    children.push(asyncRouter[item.name])
  } else if (item.children) {
      item.children.forEach(e => {
          generateRoutes(children, e)
      })
  }
}
/**
*
* @param {Array} routes 用户过滤后的路由
*
* 递归为所有有子路由的路由设置第一个children.path为默认路由
*/
export function setDefaultRoute(routes) {
  routes.forEach((v, i) => {
      if (v.children && v.children.length > 0) {
        v.redirect = { name: v.children[0].name }
        console.log('v.redirect',v.children[0].name)
          setDefaultRoute(v.children)
      }
  })
}
