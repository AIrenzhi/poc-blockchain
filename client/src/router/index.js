import VueRouter from 'vue-router'

import Login from '../pages/Login'
import Home from '../pages/Home'
import Index from '../pages/index/index'

// 用户
import UserList from '../pages/users/List'
import AddUser from '../pages/users/Add'

// 订单
import OrderList from '../pages/orders/List'
import AddOrder from '../pages/orders/Add'

const routes = [
  { 
    path: '/', 
    component: Home,
    children:[
      { 
        path: '/', 
        component: Index 
      },
      { 
        path: '/users', 
        component: UserList 
      },
      { 
        path: '/users/add', 
        component: AddUser 
      },
      { 
        path: '/users/detail/:id', 
        component: AddUser 
      },
      { 
        path: '/orders', 
        component: OrderList 
      },
      { 
        path: '/orders/add', 
        component: AddOrder 
      },
    ]
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