import axios from 'axios'

const request = axios.create({
    // baseURL: '/dev-api', 
    baseURL: '/',
    // baseURL: "//121.199.42.23:80",
    // baseURL: '/',
    timeout: 5000 // 请求超时，5000毫秒
})

export default request;