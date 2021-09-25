import request from '@/utils/axios'
// 新增目录
export function addCatalog(parmas) {
  return request('/imageOnlineManager/catalog', 'POST', parmas, false)
}
export function getAllCatalog(parmas) {
  return request('/imageOnlineManager/catalog/all', 'GET', parmas, false)
}

export function getCatalogDownList(parmas) {
  return request('/imageOnlineManager/catalog/dropdownList', 'GET', parmas, false)
}
// 删除目录
export function delCatalog(catalogCode, parmas) {
  return request(`/imageOnlineManager/catalog/${catalogCode}`, 'DELETE', {}, false)
}
// 修改目录
export function editCatalog(catalogCode, parmas) {
  return request(`/imageOnlineManager/catalog/${catalogCode}`, 'PUT', parmas, false)
}
// 目录移动
export function moveCatalog(parmas) {
  return request(`/imageOnlineManager/catalog/remove`, 'GET', parmas, false)
}

