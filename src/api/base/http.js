import axios from 'axios'
// import restaurant from './restaurant'

// restaurant循环遍历输出不同的请求方法
const instance = axios.create({
  baseURL: 'http://118.123.19.159:3000',
  timeout: 1000
})
const http = {} //包裹请求方法的容器

for (let key in restaurant) {
  let api = restaurant[key] // 里面有url method
  http[key] = async function (
    params, //请求参数get放在url put,post,patch放在data delete放在url
    isFormData = false,// 标识是否是form-data请求
    config= {} //配置参数
  ) {
    let newParams = {}
    //content-type是否是form-data的判断
    if (params && isFormData) {
      newParams = new FormData()
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    //不同请求的判断
    let response = {} //请求的返回值
    if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
      try {
        response = await instance[api.method](api.url, newParams, config)
      }catch (err) {
        response = err
      }
    } else if (api.method === 'delete' || api.method === 'get') {
      config.params = newParams
      try {
      response = await instance[api.method](api.url, config)
      } catch (err) {
        response = err
      }
    }
    return response //返回请求响应值
  }
}

export default http