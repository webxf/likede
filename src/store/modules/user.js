import {login} from '@/api/user'
import { Message } from 'element-ui'
import router from '@/router'
export default {
  namespaced: true,
  state:{
    token:JSON.parse(localStorage.getItem('token'))||{},
  },
  mutations:{
    //登录
    setToken(state,payload){
      state.token = payload
      //将token存储到本地
      localStorage.setItem('token',JSON.stringify(state.token))
    },
  },
  actions:{
   
    //登录请求
   async getToken(context,payload){
    const {data} = await login(payload)
    console.log(data.token);
    //登录成功跳转页面
    router.push('/')
      // if(data.success){
      //  Message({
      //   message:`${data.msg}`,
      //   type:'success'
      //  })
       context.commit('setToken',data.token)
      // }else {
      //   Message.error(data.msg)
      // }
    },
  }
}