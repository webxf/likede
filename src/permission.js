import router from '@/router'
import store from '@/store'

// //配置全局前置守卫，可以解决不登陆就能跳转页面情况
// //配置不登陆可以跳转白名单路径
const whiteList = ['/login','/404']
router.beforeEach((to,from,next) => {  
    //拿到登录后的token
    const token = store.state.user.token
    if(token){
        // if(!store.state.user.token.userId){
            store.dispatch('user/getUserInfo',store.state.user.userId)
        // }
        if(to.path === '/login'){
            next('/')
        }else{
            next()
        }
    }else{
        const isincludes = whiteList.includes(to.path)
        if(isincludes){
            next()
        }else{
            next('/login')
        }
    }
})