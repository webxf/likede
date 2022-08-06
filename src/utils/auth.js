import Cookies from 'js-cookie'
import dayjs from 'dayjs'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
//存储cookies
export function setTokenTime(){
  Cookies.set('tokenTime',Date.now())
}
export function getTokenTime(){
  Cookies.get('tokenTime')
}
// 配置相对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// 配置中文包, dayjs默认是英文
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

export default dayjs