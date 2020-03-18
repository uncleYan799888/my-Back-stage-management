import axios from 'axios'
//本地访问用外网端口，上线访问用内网端口3000
const service = axios.create({
    baseURL: 'http://118.123.19.159:12466',
    // baseURL: 'http://localhost:3000',
    timeout: 2000,
})


// 添加请求拦截器
service.interceptors.request.use(config=>{
    // 将token给到一个前后台约定好的key中，作为请求发送
    // let token = localStorage.getItem('token')
    // let token = store.state.userAccount
    let token = window.sessionStorage.getItem('token')
    if (token) {
    config.headers['Authorization'] = token
    }
    return config
},error=>{
    // Do something with request error
    return Promise.reject(error)
})

service.interceptors.response.use(res=>{
    return res.data
}, err => {
    return Promise.reject(err)
})


export default service