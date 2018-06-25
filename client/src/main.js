import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = true
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
