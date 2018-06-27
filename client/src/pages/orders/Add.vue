<template>
  <div class="hello">
  Add

  <input type="text" v-model="order_id" placeholder="订单号"> <br />
  <input type="text" v-model="customer_id" placeholder="用户id"> <br />
  <input type="text" v-model="vender_id" placeholder="厂家id"> <br />
  <input type="text" v-model="agent_id" placeholder="中介ID"> <br />
  <input type="text" v-model="status" placeholder="订单状态"> <br />
  <select v-model="role">
    <option value="customer">customer</option>
    <option value="vender">vender</option>
    <option value="agent">agent</option>
  </select>

  <button @click="submitUser"> 新增</button>
  </div>
</template>

<script>
import transactions from '../../services/transactions'
import payloads from '../../services/payloads'
import api from '../../services/api'
import _ from 'lodash'

export default {
  name: 'HelloWorld',
  data(){
    return {
      order_id:'',
      customer_id:'',
      status:'',
      vender_id:'',
      agent_id:'',
      role:''
    }
  },
  methods:{
    submitUser(){
      // const keys = transactions.makePrivateKey(this.password)
      // const user = _.assign(keys, _.pick(state, 'username', 'email'))
      // const user = _.assign(keys, {'username':this.username, 'email':this.email,role:this.role})
      // user.password = api.hashPassword(this.password)
      const orderOrigin  = {
        orderId:this.order_id,
        customerId:this.customer_id,
        agentId:this.agent_id,
        venderId:this.vender_id,
        status:this.status,
      }
      const order = payloads.createOrder(orderOrigin)
      // const order = payloads.updateOrder(orderOrigin)

      console.log(orderOrigin)
      console.log(order)

  transactions.submit(order, true)
    // .then(() => api.post('users', user))
    .then(res => console.log('add success',res))
    // .then(() => m.route.set('/'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-btn{
    width: 80px;
    height: 50px;
    border:1px solid red;
}
</style>
