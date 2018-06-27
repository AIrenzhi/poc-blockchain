import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from '../pages/Login'
import Home from '../pages/Home'
import Index from '../pages/index/index'

import textRouter from './test.router'

let  homeRouters = [
  { 
    path: '/', 
    component: Index 
  }
]
homeRouters = homeRouters.concat(textRouter)

let routes = [
  { 
    path: '/', 
    component: Home,
    children:homeRouters
  },
  { 
    path: '/login', 
    component: Login 
  },
]


const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })

export default router