<template>
  <div class="home">
    <div class="a">
      <div class="landForm">
        <h1 class="title">{{title}}</h1>
        <div class="Account">
          <span class="font">账号: </span><el-input v-model="userInfo.account" placeholder="请输入账号" maxlength='12'></el-input>
        </div>
        <div class="password">
          <span class="font">密码: </span><el-input v-model="userInfo.password" placeholder="请输入密码" show-password></el-input>
        </div>
        <div class="login" @click="login">
          <!-- <router-link to="/base">登录</router-link> -->
          登录
        </div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
import {asyncRouterMap} from '../router'
export default {
  name: 'home',
  data() {
    return {
      title: '登录',
      userInfo: {
        account: '',
        password: ''
      }
    }
  },
  created() {
  },
  mounted() {
    // this.checkCookie()
  },
  methods: {
    ...mapMutations(['login_in']),
    login() {
      console.log('login')
      axios.post('http://118.123.19.159:12466/login',{account: this.userInfo.account, password: this.userInfo.password}).then(res => {
        // this.$store.dispatch('loginByUsername',this.userInfo).then(() =>{
          console.log('login-res')
          if(res.data.statu === 1) {
            console.log('登录成功', res.token)
            window.sessionStorage.setItem('token', res.data.token)
            this.login_in(res.data.token)
                // setTimeout(() => {
                  this.$router.push({path: '/base'})
                // }, 500);
          }
        }).catch(err => {
          throw err
        })
    },
    checkCookie() {
      // let pass = []
      // let info = document.cookie.split(',')
      // console.log(info)
      // for (let i = 0; i < info.length; i++) {
      //   let a = info[i].split('=')
      //   pass.push(a[1])
      //   console.log('a', a)
      // }
      // console.log(pass)
      // if(pass[0] === this.account && pass[1] === this.password) {
      //   this.router.push('/base')
      //   console.log('pass')
      // }
      this.$router.push('/base')
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background-image: url('../assets/background_img.jpg');
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;
}
.a {
  width: 100%;
  height: 100%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
}
.landForm {
  width: 400px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  /* height: 400px; */
  /* background: #ffffff; */
  /* margin: 10px auto; */
  /* position: fixed;
  top: 50%;
  left: 50%; */
  /*减去自身一半长度*/
  /* margin: 0 auto; */
  transform: translate(-50%, -50%);
}
.title {
  margin: 5px auto;
  text-align: center;
}
.font {
  font-size: 20px;
  font-weight: bold;
}
.el-input {
  width: 250px;
}
.Account {
  text-align: center;
  margin-top: 20px;
}
.password {
  text-align: center;
  margin-top: 20px;
}
.login {
  text-align: center;
  background: #fc0303;
  height: 40px;
  line-height: 40px;
  width: 100px;
  margin: 20px auto;
  border-radius: 8%;
  color:#fff;
}
.login:hover {
  background: #fa1d1d;
  color: #ffffff;
  cursor: pointer;
  transition: all .3s ease-in;
}
.mask {
  width: 400px;
  height:250px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 998;
  transform: translate(-50%, -50%);
  opacity: 0.3;
}
</style>
