import service from '../../unit/axiosNew'

// 区域种类选择框
export function FoodListInput(params) {
  return service({
    url: '/restaurantSelect',
    method: 'get',
    params
  })
}

// 表格
export function getData(params) {
  return service({
    url: '/list/product',
    method: 'get',
    params
  })
}

// 添加
export function addRestaurant(data) {
  return service({
    url: '/addRestaurant',
    method: 'post',
    data
  })
}