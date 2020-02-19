import service from '../../utils/axiosNew'

export function fetchPermission(params) {
  return service.get('http://localhost:3000/getUserInfo', { params: { token: params } })
  // return service({
  //   url: '/getUserInfo',
  //   method: 'get',
  //   params
  // })
}