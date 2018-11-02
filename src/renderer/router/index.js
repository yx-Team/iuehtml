import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'zheye',
      component: require('@/views/zheye/Zheye').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/views/login/Login').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
