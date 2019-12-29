import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: login
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/base',
    name: 'base',
    component: () => import(/* webpackChunkName: "about" */ '../views/base.vue'),
    children:[
      {path: '/base1', component: () => import('../views/base/base1')},
      {path: '/base2', component: () => import('../views/base/base2')},
      {path: '/baseHome', component: () => import('../views/base/baseHome')},
      {path: '/RestaurantList', component: () => import('../views/restaurant/RestaurantList')},
      {path: '/todoList', component: () => import('../views/base/todoList')},
      { path: '/addRestaurant', component: () => import('../views/restaurant/addRestaurant') },
      { path: '/StarRestaurant', component: () => import('../views/restaurant/StarRestaurant') },
      { path: '/personalInfo', component: () => import('../views/base/PersonalInfo') },
      { path: '/Internationalization', component: () => import('../views/base/Internationalization') },
      { path: '/todoListADMIN', component: () => import('../views/base/todoListADMIN') }
    ]
  }
  // {
  //   path: '/about/base1',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/base/base1')
  // }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: '/',
  routes
})

export default router
