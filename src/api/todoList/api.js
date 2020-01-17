import service from '../../utils/axiosNew'

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

//管理员添加事项
export function todoAdd(data) {
  return service({
    url: '/todoAdd',
    method: 'post',
    data
  })
}

//执行者提交事项
export function todoSubmission(data) {
  return service({
    url: '/todoSubmission',
    method: 'post',
    data
  })
}