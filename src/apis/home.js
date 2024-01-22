import http from '@/utils/http'

export function getBannerAPI (distributionSize='1') {
    return http.get('/home/banner',{params:{distributionSize}});
}

export function getNewAPI () {
    return http.get('/home/new')
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
    return http.get('/home/hot')
}

/**
 * @description: 获取产品列表
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
    return http.get('/home/goods')
}