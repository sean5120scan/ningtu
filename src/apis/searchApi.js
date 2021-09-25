import request from '@/utils/axios'

export function getRecordsList(parmas) {
  return request('imageOnlineManager/searchLog', 'GET', parmas, true)
}
