import request from '@/utils/axios'
export function getImageList(parmas) {
    console.log('parmas.isLoading:', parmas.isLoading)
    return request('/imageOnlineManager/imageInfo', 'GET', parmas, parmas.loading)
}
export function getImageInfo(id, parmas) {
    return request(`/imageOnlineManager/imageInfo/${id}`, 'GET', parmas, false)
}
export function delImages(parmas) {
    return request('/imageOnlineManager/imageInfo/batchDelete', 'POST', parmas, false)
}
export function moveImages(parmas) {
    return request('/imageOnlineManager/imageInfo/batchRemove', 'PUT', parmas, false)
}
export function reBackImages(parmas) {
    return request('/imageOnlineManager/imageInfo/batchReduction', 'POST', parmas, false)
}
// 修改图片
export function modifyImg(id, parmas) {
    return request(`/imageOnlineManager/imageInfo/${id}`, 'PUT', parmas, false)
}

// 获取图片标签
export function getImgTags(parmas) {
    return request(`/imageOnlineManager/label/dropdownList`, 'GET', parmas, false)
}