import service from '../../unit/axiosNew'

//非管理员待办
export function todoList(params) {
  return service({
    url: '/todoList',
    method: 'get',
    params
  })
}

//管理员待办
export function todoListADMIN(params) {
  return service({
    url: '/todoListADMIN',
    method: 'get',
    params
  })
}

//驳回
export function todoReject(data) {
  return service({
    url: '/todoReject',
    method: 'post',
    data
  })
}