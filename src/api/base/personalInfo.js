import service from '../../utils/axiosNew'

//上传头像
export function sendAvatar(data) {
  return service({
    url: '/sendAvatar',
    method: 'post',
    data
  })
}

export function getUserInfo(params) {
  return service({
    url: '/getUserInfo',
    method: 'get',
    params
  })
}