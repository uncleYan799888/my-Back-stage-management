import axios from 'axios'
const service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
})


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 将token给到一个前后台约定好的key中，作为请求发送
    // let token = localStorage.getItem('token')
    // let token = store.state.userAccount
    let token = window.sessionStorage.getItem('token')
    if (token) {
    config.headers['Authorization'] = token
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

export default service