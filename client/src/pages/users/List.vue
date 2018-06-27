<template>
  <div class="hello">
  <button @click="$router.push('/users/add')">新增用户</button>
      用户列表 list 
  <ul>
    <li class="user-item" v-for="item in list" :key="item.key">
      <span class="user-name">{{item.name}} </span>
      <span class="user-role"></span>
    </li>
  </ul>

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
      api.get('myuser').then((agents) => {
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
