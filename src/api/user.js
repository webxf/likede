import request from '@/utils/request'

/**
 * 
 * @param {登录请求} data 
 * @returns promise
 */
export const login = (data) => {
  return request({
    url:'/api/user-service/user/login',
    method:'POST',
   data
  })
}
/**
 * 
 * @param {验证码} clientToken 
 * @returns promise
 */
//验证码请求接口
export const code = (clientToken) => {
  return request({
    url:`/api/user-service/user/imageCode/${clientToken}`,
    method:'GET',
    responseType:'blob'
  })
}