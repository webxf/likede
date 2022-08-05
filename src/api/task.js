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

  export function getTaskSearchApi(){
    return request({
      url:'/task-service/task/search',
      method: 'GET',
    })
  }