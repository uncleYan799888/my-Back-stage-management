<template>
  <div class="base">
    <el-container style="height:100%;border: 1px solid #eee;">
      <el-aside width="300px">
        <div class="left_title" @click="back">
          <i class="el-icon-platform-eleme"></i> 后台管理系统
          </div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b" router>
          <el-menu-item index="/baseHome">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/todoList">
            <i class="el-icon-collection-tag"></i>
            <span slot="title">待办</span>
          </el-menu-item>
          <el-menu-item index="/todoListADMIN">
            <i class="el-icon-collection-tag"></i>
            <span slot="title">待办ADMIN</span>
          </el-menu-item>
          <!-- <el-menu-item index="/form">
            <i class="el-icon-document"></i>
            <span slot="title">基础表格</span>
          </el-menu-item> -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>深圳餐馆管理</span>
            </template>
              <el-menu-item index="/RestaurantList">
                餐馆列表
              </el-menu-item>
              <el-menu-item index="/addRestaurant">
                添加餐馆
              </el-menu-item>
              <el-menu-item index="/StarRestaurant">明星餐馆</el-menu-item>
          </el-submenu>
          <el-menu-item index="/personalInfo">
            <i class="el-icon-user"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/Internationalization">
            <i class="el-icon-picture-outline-round"></i>
            <span slot="title">国际化</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
            <span>路由二</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">分组二</template>
              <el-menu-item index="3-3">选项3</el-menu-item>
              <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项1</el-menu-item>
            </el-submenu>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">路由三</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">路由四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
  
  <el-container class="right">
    <el-header>
      <topLevelBar></topLevelBar>
    </el-header>
    <el-main class="right_main"><router-view/></el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import topLevelBar from '../components/base/topLevelBar'
  export default {
    components: {
      topLevelBar
    },
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        baseHome: ['/baseHome']
      }
    },
    created() {
      this.checkCookie()
      this.$router.push('/baseHome')
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        console.log('path', this.$route.path)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      push() {
        // this.$router.push('/about/base1')
      },
      back() {
        this.$router.push('/baseHome')
        console.log(document.cookie)
      },
      checkCookie() {
      let info = document.cookie.split(',')
      console.log(info[0].split('='))
      let final = info[0].split('=')[1]
      console.log(final)
      this.$store.commit('login', final)
    }
    }
  };
</script>

<style>
.base {
  height: 100%;
  width: 100%;
}
  .el-header {
    background-color: #FFFFFF;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
    background: #545c64;
  }
  .right {
    width:70%;
    margin-left:20px;
  }
  .right_main {
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border: 1px solid #eee;
      padding: 0;
      background: #F0F0F0;
  }
  .left_title {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
    color: #FFFFFF;
  }
  .left_title:hover{
    cursor: pointer;
  }
</style>