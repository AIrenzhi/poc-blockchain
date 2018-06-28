
import List from '../pages/index/list.vue'
import Detail from '../pages/index/detail.vue'

export default [
    {
        path: '/test/list',
        component: List,
        meta: {
            keepAlive: false
        }
    },
    {
        path: '/test/detail',
        component: Detail,
        meta: {
            keepAlive: false
        }
    }
]