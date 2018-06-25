<template>
  <div class="hello">
  <button @click="$router.push('/orders/add')">新增订单</button>
      订单列表 list 

      <table border="1">
        <tr>
          <td>订单号</td>
          <td>顾客ID</td>
          <td>中介ID</td>
          <td>厂家ID</td>
          <td>状态</td>
          <td>操作</td>
        </tr>
        <tr  v-for="item in list" :key="item.key">
          <td>{{item.orderId}} </td>
          <td>{{item.customerId}} </td>
          <td>{{item.agentId}} </td>
          <td>{{item.venderId}} </td>
          <td>{{item.status}} </td>
          <td><button>更新</button></td>
        </tr>
      </table>
  
  </div>
</template>

<script>
import api from "../../services/api";

export default {
  name: 'HelloWorld',
  data(){
    return {
      list:[]
    }
  },
  created(){
    this.fetchData()
  },
  methods:{
    fetchData(){
      api.get('orders').then((agents) => {
        // console.log(agents)
        this.list = agents 
      })
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
