<template>
<div class="menu-bix">
  <div class="logo">
    logo
  </div>
    <el-menu
      default-active="0"
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <template  v-for="(item,index) in menu"  >
        <el-submenu  v-if="item.children" :key="index" :index="`${index}`">
        <span slot="title">  
            <i :class="[`el-icon-${item.icon}`]"></i> 
            <span>{{item.title}}</span>
        </span>
        <el-menu-item-group >
          <el-menu-item  
            v-for="(citem,cindex) in item.children" 
            :key="cindex"  
            :index="`${index}-${cindex}`" 
            @click="goView(citem.path)">
            {{citem.title}}
          </el-menu-item>
        </el-menu-item-group>
       </el-submenu>
       <el-menu-item v-else :key="index" :index="`${index}`"  @click="goView(item.path)">
        <i :class="[`el-icon-${item.icon}`]"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      </template>
    </el-menu>
      
</div>
</template>

<script>
import menu from "../../router/menu";
export default {
  name: "slide",
  data() {
    return {
      menu
    };
  },
  methods: {
    goView(path) {
      console.log("path:", path);
    }
  }
};
</script>

<style scoped >
.logo{
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#fff;
  font-size: 22px;
  background: #545c64;
  border-bottom: 1px solid blue;
}
.el-menu-vertical{
  height: calc(100% - 60px);
}
</style>


