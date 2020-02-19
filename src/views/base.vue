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
          <template v-for="(item) in menus">
            <template v-if="item.children.length >=1">
              <el-submenu :index='item.index' :key="item.key">
                <template slot="title">
                  <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
                </template>
                  <el-menu-item v-for="sub in item.children" :index='sub.index' :key="sub.index">
                    {{sub.title}}
                  </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index='item.index' :key="item.index">
                <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
  
  <el-container class="right">
    <el-header>
      <topLevelBar></topLevelBar>
    </el-header>
    <el-main class="right_main" style="padding:1px;"><router-view/></el-main>
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
    computed:{
      menus() {
        return this.$store.state.permission.sidebarMenu
      }
    },
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        baseHome: ['/baseHome'],
        menu:[{
          icon: 'el-icon-s-home',
          index: 'baseHome',
          title: '首页',
          subs:[],
          name: 'baseHome'
        },{
          icon: 'el-icon-s-home',
          index: 'todolistADMIN',
          title: '待办admin',
          subs:[],
          name: 'todolistADMIN'
        },{
          icon: 'el-icon-document',
          index: '1',
          title: '深圳餐馆整理',
          subs:[{
            index: 'RestaurantList',
            title: '餐馆列表',
            name: 'RestaurantList'
          },{
            index: 'addRestaurant',
            title: '添加餐馆',
            name: 'addRestaurant'
          },{
            index: 'StarRestaurant',
            title: '明星餐馆',
            name: 'StarRestaurant'
          }]
        },{
          icon: 'el-icon-user',
          index: 'personalInfo',
          title: '个人信息',
          subs:[],
          name: 'personalInfo'
        },{
          icon: 'el-icon-picture-outline-round',
          index: 'Internationalization',
          title: '国际化',
          subs:[],
          name: 'Internationalization'
        }]
      }
    },
    created() {
      // this.checkCookie()
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
      // this.$store.commit('login', final)
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
  .right_main {
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border: 1px solid #eee;
      padding: 10px;
      background: #F0F0F0;
  }
  .el-aside {
    color: #333;
    background: #545c64;
  }
  .right {
    width:70%;
    margin-left:20px;
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
  .el-menu{
    width:300px;
  }
</style>