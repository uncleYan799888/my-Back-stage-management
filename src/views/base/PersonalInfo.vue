<template>
  <div class="personalInfo" v-loading='sendingAvatar'>
    <div class="top">
            <div class="top_title">个人信息</div>
            <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/baseHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <div class="avatar">
      <el-avatar shape="square" :size="200" fit="fit" :src="userInfo.avatar"></el-avatar>
    </div>
    <div class="info">
      <div class="info_item">name <span class="info_item_v">{{userInfo.name}}</span></div>
      <div class="info_item">age: <span class="info_item_v">{{userInfo.age}}</span></div>
      <div class="info_item">hobby: <span v-for="(item, index) in userInfo.hobby" :key="index">{{item}} </span> </div>
      <div class="info_item">city: <span class="info_item_v">{{userInfo.city}}</span></div>
    </div>
  </div>
</template>

<script>
import { sendAvatar,getUserInfo } from '../../api/base/personalInfo'
import { mapState } from 'vuex'
  export default {
    computed:{
      ...mapState({
        userInfo: state => state.permission.userInfo
      })
    },
    data() {
      return {
        imageUrl: '',
        sendingAvatar: false
      };
    },
    created() {
      // console.log('ref',this.$refs)
      this.getAvatar()
    },
    mounted() {
      // console.log('ref',this.$refs.d.style.background = `url(${this.imageUrl})`)
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.sendingAvatar = true
        this.imageUrl = URL.createObjectURL(file.raw);
        const name = this.$store.state.userAccount
        console.log('res', res)
        console.log('file', file)
        this.getBase64(file.raw).then(res => {
          console.log('转换后', res)
          this.imageUrl = res
          sendAvatar({account: name, avatar: this.imageUrl}).then(res => {
            alert(res.data.msg)
            this.sendingAvatar = false
            console.log('res', res)
          }).catch(err => {
            throw err
          })
        }).catch(err => {
          throw err
        })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      errorHandler() {
        return true
      },
      getAvatar() {
        let token = window.sessionStorage.getItem('token')
        console.log('token', token)
        getUserInfo({token: token}).then(res => {
          this.imageUrl = res.data.avatar
          console.log('拿头像', typeof this.imageUrl)
        }).catch(err => {
          throw err
        })
      }
  }
  }
</script>

<style>
.personalInfo {
  /* text-align: center; */
  padding: 20px;
  background: #fff;
  height: 100%;
}
.infoGrounp {
  /* display: flex; */
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    text-align: center;
  }
  .info {
    margin-left: 30%;
    margin-top: 20px;
  }
  .info_item {
    margin-top: 10px;
  }
  .info_item_v {
    margin-left: 10px;
  }
  .top_title {
    font-size: 30px;
    font-weight: bold;
}
.breadcrumb {
    margin: 10px 0;
}
</style>