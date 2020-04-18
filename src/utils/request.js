import axios from 'axios'

const request = axios.create({
    // baseURL: '/dev-api', 
    baseURL: '/', 
    // baseURL: '/',
    timeout: 5000 // 请求超时，5000毫秒
})

export default request;