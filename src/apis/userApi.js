import request from '@/utils/axios'

export function getAdminList(parmas) {
    return request('/imageOnlineManager/user', 'GET', parmas, true)
}
export function login(parmas) {
    return request('/imageOnlineManager/login', 'POST', parmas, false, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
export function getUserInfo(parmas) {
    return request('/imageOnlineManager/user/authorizationInfo', 'GET', parmas, false)
}
export function addUser(parmas) {
    return request('/imageOnlineManager/user', 'POST', parmas, false)
}
export function delUser(userCode, parmas) {
    return request(`/imageOnlineManager/user/${userCode}`, 'DELETE', {}, false)
}
export function editUser(userCode, parmas) {
    return request(`/imageOnlineManager/user/${userCode}`, 'PUT', parmas, false)
}