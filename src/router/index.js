import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import base from '../views/base.vue'
import baseHome from '../views/base/baseHome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: () => import('../components/404.vue'),
  }, 
  { path: '/', redirect: '/base' }
]
export const asyncRouterMap = [
  {
    path: 'base',
    component: base,
    children: [
      {path: '/baseHome', name: 'baseHome', component: () => import('../views/base/baseHome'),meta: ['ADMIN','SUPER_EDITOR','TOURIST']},
  {path: '/RestaurantList', name: 'RestaurantList', component: () => import('../views/restaurant/RestaurantList'),meta: ['ADMIN','SUPER_EDITOR','TOURIST']},
  {path: '/todoList', name: 'todoList',component: () => import('../views/base/todoList'),meta: ['SUPER_EDITOR','TOURIST']},
  { path: '/addRestaurant', name: 'addRestaurant',component: () => import('../views/restaurant/addRestaurant'),meta: ['ADMIN','SUPER_EDITOR']},
  { path: '/StarRestaurant', name: 'StarRestaurant',component: () => import('../views/restaurant/StarRestaurant'),meta: ['ADMIN','SUPER_EDITOR','TOURIST']},
  { path: '/personalInfo', name: 'personalInfo',component: () => import('../views/base/PersonalInfo'),meta: ['ADMIN','SUPER_EDITOR','TOURIST']},
  { path: '/Internationalization',name: 'Internationalization', component: () => import('../views/base/Internationalization'),meta: ['ADMIN','SUPER_EDITOR','TOURIST']},
  { path: '/todoListADMIN', name: 'todoListADMIN',component: () => import('../views/base/todoListADMIN'),meta: ['ADMIN','SUPER_EDITOR']},
    ]
  }
]


export default new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: '/',
  routes
})

// export const DynamicRoutes = [
//   {
//       path: '',
//       component: Layout,
//       name: 'container',
//       redirect: 'home',
//       meta: {
//           requiresAuth: true,
//           name: '首页'
//       },
//       children: [
//           {
//               path: 'home',
//               component: Home,
//               name: 'home',
//               meta: {
//                   name: '首页'
//               }
//           }
//       ]
//   },
//   {
//       path: '/403',
//       component: Forbidden
//   },
//   {
//       path: '*',
//       component: NotFound
//   }
// ]
