import request from '@/utils/request'

/**
 * 获取园区信息
 * @returns {*}
 */
export const getParkInfoApi = () => {
  return request({
    url: "/park/statistics/info",
    method: 'get'
  })
}
