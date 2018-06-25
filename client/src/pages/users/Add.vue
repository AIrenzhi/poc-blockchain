<template>
  <div class="hello">
  Add

  <input type="text" v-model="username" placeholder="输入用户名"> <br />
  <input type="text" v-model="password" placeholder="输入密码"> <br />
  <input type="text" v-model="email" placeholder="输入邮箱"> <br />
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
      username:'',
      email:'',
      password:'',
      role:''
    }
  },
  methods:{
    submitUser(){
      const keys = transactions.makePrivateKey(this.password)
      // const user = _.assign(keys, _.pick(state, 'username', 'email'))
      const user = _.assign(keys, {'username':this.username, 'email':this.email,role:this.role})
      user.password = api.hashPassword(this.password)
      const agent = payloads.createMyuser({'name':this.username,role:this.role})

  transactions.submit(agent, true)
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
