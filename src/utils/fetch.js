import qs from "qs"
import {
    useHistory
} from "react-router-dom"
import {
    message
} from "antd"
const BASEURL = process.env.REACT_APP_BASE_URL
const Fetch = (url, data, customConfig) => {
    // let history = useHistory()
    const key = "msg"
    message.loading({
        content: '加载中,请稍后...',
        style: "minWidth:220px",
        key,
        duration: 0
    });
    url = process.env.REACT_APP_ENV === "development" ? "" : `${process.env.REACT_APP_ENV}${url}`
    let token = localStorage.getItem("token")
    let config = {
        method: "GET",
        headers: {
            "token": token ? token : "",
            "Content-type": "application/json"
        },
        ...customConfig
    }

    debugger
    if (config.method.toUpperCase() === "GET" || config.method.toUpperCase() === "DELETE") {
        url = `${url}?${qs.stringify(data)}`
    } else if (config.method.toUpperCase() === "POST" || config.method.toUpperCase() === "PUT") {

        config.body = JSON.stringify(data)
        debugger
    }
    return fetch(`${BASEURL}${url}`, config).then(async res => {
        if (res.status === 401) {
            // history.replace("/login")
            return Promise.reject({
                message: "请重新登录"
            })
        } else {
            if (res.ok) {
                message.destroy(key)
                return data
            } else {
                message.error(data)
                Promise.reject(data)
            }
        }
    }).catch(err => {
        message.error(err)
    })
}

export default Fetch