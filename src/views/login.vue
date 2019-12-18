<template>
  <div class="home">
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
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  data() {
    return {
      title: '后台管理系统',
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
    login() {
      console.log('login')
      axios.post('http://localhost:3000/login',{account: this.userInfo.account, password: this.userInfo.password}).then(res => {
          if(res.data.statu === 1) {
            console.log('登录成功', res.data.token)
            window.sessionStorage.setItem('token', res.data.token)
            // this.$store.dispatch('loginByUsername', this.userInfo).then(()=> {
            //     console.log('login页面', res)
                setTimeout(() => {
                  this.$router.push({path: '/base'})
                }, 200);
            //     // let token = window.sessionStorage.getItem('token')
            //     // this.$store.dispatch('getInfo', token)
                
            // }).catch(err => {
            //   this.$message.error(err)
            // })
          } else {
            this.$message.error('登录失败')
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
      this.$router.push('http://localhost:8080/base')
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 750px;
  background-image: url('../assets/timg.jpg');
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.landForm {
  width: 400px;
  /* height: 400px; */
  background: #ffffff;
  /* margin: 10px auto; */
  /* position: fixed;
  top: 50%;
  left: 50%; */
  /*减去自身一半长度*/
  /* margin: 0 auto; */
  /* transform: translate(-50%, -50%); */
}
.title {
  margin: 10px auto;
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
  margin-top: 35px;
}
.password {
  text-align: center;
  margin-top: 20px;
}
.login {
  text-align: center;
  background: #fc0303;
  height: 50px;
  line-height: 50px;
  width: 100px;
  margin: 20px auto;
  border-radius: 8%;
}
.login:hover {
  background: #fa1d1d;
  color: #ffffff;
  cursor: pointer;
  transition: all .3s ease-in;
}
</style>
