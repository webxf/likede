import request from '@/utils/request'

/**
 * 
 * @param {工单详情} id 
 * @returns promise
 */
 export function getTaskStatusApi(){
    return request({
      url:'/task-service/task/allTaskStatus',
      method: 'GET',
    })
  }
/**
 * 
 * @returns promise
 */
  export function getTaskSearchApi(params){
    return request({
      url:'/task-service/task/search',
      method: 'GET',
      params
    })
  }

  //新建工单
  export function createTaskApi(data){
    return request({
      url:'/task-service/task/create',
      method:'POST',
      data
    })
  }
  //工单配置
  export function deployTaskApi(params){
    return request({
      url:'/task-service/task/supplyAlertValue',
      method:'GET',
      params
    })
  }

  /**
   * 
   * @param {工单状态} params 
   * @returns promise
   */
   export function allTaskStatus(params){
    return request({
      url:'/task-service/task/allTaskStatus',
      params
    })
   }