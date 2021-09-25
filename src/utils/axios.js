import axios from "axios"
import qs from "qs"
import {
    message
} from "antd"
const BASEURL = process.env.REACT_APP_BASE_URL
const config = {
    timeout: 5000,
    baseURL: BASEURL
}
const Http = axios.create(config)
const key = "msg"
// 添加请求拦截器
Http.interceptors.request.use((config) => {
    const Token = localStorage.getItem("token")
    if (Token) {
        config.headers.token = Token
    }
    console.log(config)
    if (config.method === 'post' || config.method === 'put') {

        if (config.data.loading) {
            message.loading({
                content: '加载中,请稍后...',
                key,
                duration: 0
            });
        }
    } else {

        if (config.params.loading) {
            message.loading({
                content: '加载中,请稍后...',
                key,
                duration: 0
            });
        }
    }
    return config
})
// 添加响应拦截器
Http.interceptors.response.use(
    (response) => {
        // debugger
        if (response.data.code === 0) {
            message.destroy(key)
        } else {
            console.log('res--response:', response)
            message.error({
                content: response.data.message,
                duration: 3,
                key
            })
        }
        return response.data
    },
    (error) => {
        console.log('error:', error)
        if (
            error.code === 'ECONNABORTED' ||
            error.message === 'Network Error' ||
            error.message.includes('timeout')
        ) {
            message.error({
                content: '当前网络错误',
                key,
                duration: 3
            })
        }
        // 错误处理
        const code = error.response.status
        if (code === 200) {
            console.log('200')
        } else if (code === 403) {
            // 处理token过期问题
            message.error({
                duration: 3,
                key,
                content: '登录已过期，请重新登录'
            })

            localStorage.clear()
        } else {
            message.error({
                content: error.response.message,
                key,
                duration: 3,
            })
        }
        return Promise.reject(error)
    }
)
// loading:  true:请求接口时出现加载提示，false反之
function request(url, method = 'GET', params = {}, loading = false, headerConfig = {}) {
    const Method = method.toLowerCase()
    if (Method === 'get' || Method === 'delete') {
        params = {
            ...params,
            loading
        }
        return Http[Method](url, {
            params
        })
    } else if (Method === 'post' || Method === 'put') {
        let data = {}
        if (Object.keys(headerConfig).length > 0) {
            data = qs.stringify({
                ...params,
                loading
            })
        } else {
            data = Object.assign(params, {
                loading
            }, headerConfig)
        }
        return Http[Method](url, data, headerConfig)
    }
}
export default request