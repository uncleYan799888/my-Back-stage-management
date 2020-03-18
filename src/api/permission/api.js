import service from '../../utils/axiosNew'

export function fetchPermission(params) {
  // return service.get('http://localhost:3000/getUserInfo', { params: { token: params } })
  return service.get('http://118.123.19.159:12466/getUserInfo', { params: { token: params } })
  // return service({
  //   url: '/getUserInfo',
  //   method: 'get',
  //   params
  // })
}