import {login,getUserInfoApi} from '@/api/user'
import {setTokenTime} from '@/utils/auth'
export default {
  namespaced: true,
  state:{
    token:'',
    userInfo:{},
    userId:''
  },
  mutations:{
    //登录
    setToken(state,payload){
      state.token = payload
    },
    setUserId(state,payload){
      state.userId = payload
    },
    //获取用户信息
    setUserInfo(state,payload){
      state.userInfo = payload
    },
    
  },
  actions:{
    //登录请求
   async getToken(context,payload){
    try{
      const res = await login(payload)
    context.commit('setToken',res.token)
    context.commit('setUserId',res.userId)
    setTokenTime()
    }catch(err){
      console.log(err);
    }
    // 
    },
    // 获取用户信息
    async getUserInfo(context,payload){
      const userInfo = await getUserInfoApi(payload)
      console.log(userInfo);
      context.commit('setUserInfo',userInfo)
    },
    async logout(context){ 
      context.commit('setToken','')
      context.commit('setUserInfo','')
      context.commit('setUserId','')

    }
  }
}