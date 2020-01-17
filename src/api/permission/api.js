import service from '../../utils/axiosNew'
import axios from 'axios'

export function fetchPermission(params) {
  return axios.get('http://localhost:3000/getUserInfo', { params: { token: params } })
  // return service({
  //   url: '/getUserInfo',
  //   method: 'get',
  //   params
  // })
}