import request from '@/utils/axios'

export function getTags(parmas) {
  return request('/imageOnlineManager/label', 'GET', parmas, true)
}
export function addTags(parmas) {
  return request('/imageOnlineManager/label', 'POST', parmas, false)
}
export function modifyTags(labelCode, parmas) {
  return request(`/imageOnlineManager/label/${labelCode}`, 'PUT', parmas, false)
}
export function delTags(labelCode, parmas) {
  return request(`/imageOnlineManager/label/${labelCode}`, 'DELETE', parmas, false)
}
