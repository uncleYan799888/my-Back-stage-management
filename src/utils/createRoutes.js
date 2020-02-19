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
  //404页面必须最后添加
  result.push(
    {path: '*', redirect: '/404'},
)
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
