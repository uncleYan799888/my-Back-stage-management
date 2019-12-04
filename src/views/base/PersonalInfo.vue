<template>
  <div class="personalInfo" v-loading='sendingAvatar'>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { sendAvatar,getUserInfo } from '../../api/base/personalInfo'
import { mapState } from 'vuex'
  export default {
    computed:mapState(['userInfo']),
    data() {
      return {
        imageUrl: '',
        sendingAvatar: false
      };
    },
    created() {
      // if(this.$store.state.userInfo) {
      //   this.imageUrl = this.$store.state.userInfo.avatar
      //   // console.log('image', avatar)
      // } else {
      //   console.log('没有头像')
      // }
      this.getAvatar()
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
          this.imageUrl = res.data.data.avatar
          console.log('拿头像', this.imageUrl)
        })
      }
  }
  }
</script>

<style>
.personalInfo {
  text-align: center;
  padding: 20px;
  background: #fff;
  height: 100%;
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
    width: 178px;
    height: 178px;
    display: block;
  }
</style>