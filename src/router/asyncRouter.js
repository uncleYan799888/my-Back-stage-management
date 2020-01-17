
const asyncRouter = {
  baseHome:{path: '/baseHome', name: 'baseHome', component: () => import('../views/base/baseHome'),meta: ['ADMIN','SUPER_EDITOR','TOURIST']},
  RestaurantList:{path: '/RestaurantList', name: 'RestaurantList', component: () => import('../views/restaurant/RestaurantList'),meta: ['ADMIN','SUPER_EDITOR','TOURIST']},
  todoList:{path: '/todoList', name: 'todoList',component: () => import('../views/base/todoList'),meta: ['SUPER_EDITOR','TOURIST']},
  addRestaurant:{ path: '/addRestaurant', name: 'addRestaurant',component: () => import('../views/restaurant/addRestaurant'),meta: ['ADMIN','SUPER_EDITOR']},
  StarRestaurant:{ path: '/StarRestaurant', name: 'StarRestaurant',component: () => import('../views/restaurant/StarRestaurant'),meta: ['ADMIN','SUPER_EDITOR','TOURIST']},
  personalInfo:{ path: '/personalInfo', name: 'personalInfo',component: () => import('../views/base/PersonalInfo'),meta: ['ADMIN','SUPER_EDITOR','TOURIST']},
  Internationalization:{ path: '/Internationalization',name: 'Internationalization', component: () => import('../views/base/Internationalization'),meta: ['ADMIN','SUPER_EDITOR','TOURIST']},
  todoListADMIN:{ path: '/todoListADMIN', name: 'todoListADMIN',component: () => import('../views/base/todoListADMIN'),meta: ['ADMIN','SUPER_EDITOR']}
}

export default asyncRouter 