<template>
    <div class="TopLevelBar">
        <div class="TopLevelBarInfo">
          <div class="TopLevelBarInfoVartar">
            <el-avatar :size="50" fit="fill" :src="avatar"></el-avatar>
          </div>
          <div class="TopLevelBarInfoName">
            <!-- <i class="el-icon-more options"></i>
            <div class="options_detail"></div> -->
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='changePassword'>修改密码</el-dropdown-item>
                <el-dropdown-item command='seeweb'>查看前端代码</el-dropdown-item>
                <el-dropdown-item command='seenode'>查看后端代码</el-dropdown-item>
                <el-dropdown-item command='exit'>退出登录</el-dropdown-item>
                <!-- <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      name:state => state.permission.userInfo.name,
      avatar:state => state.permission.userInfo.avatar
    })
  },
    data() {
        return {
            title: '个人实例后台管理系统'
        }
    },
    methods: {
      back() {
        this.$router.push('/base')
      },
      handleCommand(command) {
        // this.$message('click on item ' + command);
        if(command === 'changePassword'){
          this.$router.push('/changePassword')
        }else if(command === 'exit'){
          this.$store.commit('permission/login_out')
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        }else if(command === 'seeweb'){
          // this.$router.open('https://github.com/uncleYan799888/my-Back-stage-management.git')
          window.open('https://github.com/uncleYan799888/my-Back-stage-management.git')
        }else{
          window.open('https://github.com/uncleYan799888/my-Back-stage-management-nodejs.git')
        }
      }
    }
}
</script>

<style scoped>
.TopLevelBar {
  width: 100%;
  height: 60px;
  line-height: 60px;
  /* background: #545c64; */
  /* margin-bottom: 100px; */
}
.TopLevelBarTitle:hover {
  cursor: pointer;
}
.TopLevelBarTitle {
  font-size: 20px;
  font-weight: bold;
  float: left;
  /* margin-left: 20px; */
}
.TopLevelBarInfoVartar {
  margin-top: 5px;
  padding-right: 10px;
}
.TopLevelBarInfo {
  float: right;
  margin-right: 20px;
  /* color: #ffffff; */
  display: flex;
  /* align-items:center; */
}
.TopLevelBarInfoPass {
  margin-left: 10px;
}
.TopLevelBarInfoPass:hover {
  color: #f45468;
  cursor: pointer;
}
.el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    /* margin-bottom: 20px; */
  }
</style>