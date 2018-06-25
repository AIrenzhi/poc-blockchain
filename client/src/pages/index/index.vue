<template>
  <div class="hello">
  Index
  <button @click="$router.push('/login')">登录界面</button>
  <button @click="$router.push('/users')">去用户列表页面</button>
  <button @click="$router.push('/users/add')">新增用户</button>
   <button @click="$router.push('/orders')">去订单列表页面</button>
  <button @click="$router.push('/orders/add')">新增订单</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
