<template>
  <div class="hello">
登录页面
<form action="">
    <input type="text" v-model="username" placeholder="用户名"> <br>
    <input type="text" v-model="pwd" placeholder="密码">
    <div class="login-btn" @click="login"> 登录按钮</div>
</form>
  </div>
</template>

<script>
import api from "../services/api";
import transactions from '../services/transactions'
export default {
  name: "HelloWorld",
  data() {
    return {
      username: "test",
      pwd: "123456"
    };
  },
  methods: {
    login() {
      const credentials = {
        username: this.username,
        password: api.hashPassword(this.pwd)
      };
      api.post("authorization", credentials).then(res => {
        console.log(res)
        api.setAuth(res.authorization);
        transactions.setPrivateKey(this.pwd, res.encryptedKey);
      });
      // console.log(credentials)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-btn {
  width: 80px;
  height: 50px;
  border: 1px solid red;
}
</style>
