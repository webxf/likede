import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import {getTokenTime} from '@/utils/auth'
import router from '@/router'
function isTimeOut(){
  const currentTime = Date.now() //当前时间
  const tokenTime = getTokenTime() //存储token的时间
  const timeOut = 2 * 60 * 60 * 1000 //当前时间减去存储token时间的时间差
  return currentTime - tokenTime > timeOut
}
const service = axios.create({
 baseURL:process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  if(store.state.user.token){
    if(isTimeOut()){
      await store.dispatch('user/logout')
      router.push('/login')
  return Promise.reject(new Error('登录过期'))
    }else{
      config.headers.Authorization = `${store.state.user.token}`
    }  
  }
  return config;
}) // 请求拦截器
service.interceptors.response.use((res) => {
  //判断响应的类型
  if(res.config.responseType === 'blob'){
    // 直接返回res即可
    return res
  }

    //对res.data里面的success和msg进行解构
    // const {success,msg} = res.data
    //如果是成功登录
  // if(!success){
    //返回res.data里面的数字
    return res.data
  // }
  //否则就会抛出一个错误
  Message.error(msg)
  return Promise.reject(new Error(msg))
  },
  // return res
async function (error){
  //token过期
  if(error?.response?.status === 401){
    Message.error('登录过期')
    await store.dispatch('user/logout')
    router.push('/login')
  }else{
    Message.error(error.msg)
  }
  return Promise.reject(error)
}
) // 响应拦截器

export default service // 导出axios实例