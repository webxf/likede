import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '帝可得', icon: 'shouye' }
    }]
  },

  {
    path: '/',
    component: Layout,
    name: 'workmanger',
    meta: { title: '工单管理', icon: 'jishiben' },
    children: [
      {
        path: '/operation',
        name: 'operation',
        component: () => import('@/views/workmanger/components/operation.vue'),
        meta: { title: '运营工单'}
      },
      {
        path: '/platform',
        name: 'platform',
        component: () => import('@/views/workmanger/components/platform.vue'),
        meta: { title: '运维工单' }
      }
    ]
  },

  {
    path: '/point',
    component: Layout,
    name:'point',
    meta: { title: '点位管理', icon: 'dingwei' },
        children: [
          {
            path: '/area',
            name: 'area',
            component: () => import('@/views/point/area.vue'),
            meta: { title: '区域管理' }
          },
          {
            path: '/pointmanger',
            name: 'pointmanger',
            component: () => import('@/views/point/pointmanger.vue'),
            meta: { title: '点位管理'}
          },
          {
            path: '/operative',
            name: 'operative',
            component: () => import('@/views/point/operative.vue'),
            meta: { title: '合作商管理'}
          }
        ]
  },
  {
    path: '/deviceManagement',
    component: Layout,
    name: 'deviceManagement',
    meta: { title: '设备管理', icon: 'shebei' },
    children: [
      {
        path: '/devicemg',
        name: 'devicemg',
        component: () => import('@/views/deviceManagement/devicemg.vue'),
        meta: { title: '设备管理' }
      },
      {
        path: '/deviceStatus',
        name: 'deviceStatus',
        component: () => import('@/views/deviceManagement/deviceStatus.vue'),
        meta: { title: '设备状态' }
      },
      {
        path: '/deviceType',
        name: 'deviceType',
        component: () => import('@/views/deviceManagement/deviceType.vue'),
        meta: { title: '设备类型管理' }
      }
    ]
  },
  {
    path: '/peopleManage',
    component: Layout,
    name: 'peopleManage',
    meta: { title: '人员管理', icon: 'renyuan' },
    children: [
      {
        path: '/peopleList',
        name: 'peopleList',
        component: () => import('@/views/peopleManage/peopleList'),
        meta: { title: '人员列表' }
      },
      {
        path: '/peopleInfo',
        name: 'peopleInfo',
        component: () => import('@/views/peopleManage/peopleInfo.vue'),
        meta: { title: '人效统计' }
      },
      {
        path: '/workload',
        name: 'workload',
        component: () => import('@/views/peopleManage/workload.vue'),
        meta: { title: '工作量列表' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    name: 'product',
    meta: { title: '商品管理', icon: 'shangping' },
    children: [
      {
        path: '/productType',
        name: 'productType',
        component: () => import('@/views/product/productType.vue'),
        meta: { title: '商品类型'}
      },
      {
        path: '/productmange',
        name: 'productmange',
        component: () => import('@/views/product/productmange.vue'),
        meta: { title: '商品统计'}
      },
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'order',
    meta: { title: '订单管理', icon: 'dingdan' },
  },
  {
    path: '/bill',
    component: Layout,
    name: 'bill',
    meta: { title: '对账统计', icon: 'zhangdan' },
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
