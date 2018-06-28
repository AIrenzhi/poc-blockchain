<template>
  <div class="app-container">
      <slide class="slide-nav" />
      <div class="app-right">
        <div class="header">

        </div>
         <router-view class="mian-view">
           
         </router-view>
      </div>
     
  </div>
</template>

<script>
import slide from "../components/layout/slide.vue";
export default {
  name: "home",
  components: {
    slide
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-container{
  display: flex;
  height: 100%;
}
.slide-nav{
  width: 200px;
  height: 100%;
}
.app-right{
  flex-grow: 2
}
.header{
  height: 60px;
  background: #eaeaea;
}
.login-btn {
  width: 80px;
  height: 50px;
  border: 1px solid red;
}
</style>
