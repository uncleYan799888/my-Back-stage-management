<template>
  <div class="addRestaurant" v-loading.fullscreen.lock="fullscreenLoading">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label='上传照片' prop='avatar'>
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="餐馆店名" prop="shopname">
      <el-input v-model="ruleForm.shopname" class="restaurantName"></el-input>
    </el-form-item>
    <!-- <el-form-item label="餐馆老板" prop="name">
      <el-input v-model="ruleForm.name" class="restaurantName"></el-input>
    </el-form-item> -->
    <el-form-item label="所在区域" prop="region" required>
      <el-select v-model="ruleForm.region" placeholder="请选择所在区域">
        <el-option label="罗湖区" value="a"></el-option>
        <el-option label="南山区" value="b"></el-option>
        <el-option label="宝安区" value="c"></el-option>
        <el-option label="龙华区" value="d"></el-option>
        <el-option label="福田区" value="e"></el-option>
        <el-option label="龙岗区" value="f"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="营业时间" required>
      <el-col :span="4">
        <el-form-item prop="startTime">
          <el-time-select
            placeholder="开门时间"
            v-model="ruleForm.startTime"
            :picker-options="{
              start: '08:30',
              step: '00:30',
              end: '18:30'
            }">
          </el-time-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">-</el-col>
      <el-col :span="4">
        <el-form-item prop="endTime">
          <el-time-select
          placeholder="关门时间"
          v-model="ruleForm.endTime"
          :picker-options="{
            start: '08:30',
            step: '00:30',
            end: '23:30',
            minTime: ruleForm.startTime
          }">
        </el-time-select>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label='人均消费' prop='consumption' required>
      <el-input v-model="ruleForm.consumption" oninput = "value=value.replace(/[^\d]/g,'')" style="width:60px;" maxlength='3'></el-input>
    </el-form-item>
    <el-form-item label='整体评分' prop='evaluate' required>
      <el-rate v-model="ruleForm.evaluate" class="rate" @change='rateChange' show-score text-color="#ff9900" :max='10'></el-rate>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input type="textarea" v-model="ruleForm.address"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
import {addRestaurant} from '../../api/restaurant/api'
  export default {
    filters: {
      rate(value){
        return value.toFixed(1)
      }
    },
    data() {
      return {
        ruleForm: {
          shopname: '',
          region: '',
          // type: '',
          address: '',
          evaluate: 0,
          // name: '',
          startTime: '',
          endTime: '',
          consumption: 0,
          avatar: ''
        },
        rules: {
          shopname: [
            { required: true, message: '请输入餐馆店名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择餐馆区域', trigger: 'change' }
          ],
          startTime: [
            { required: true, message: '请选择确定开门时间', trigger: 'change' }
          ],
          endTime: [
            { required: true, message: '请选择确定关门时间', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请填写详细地址', trigger: 'blur' },
            { min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur' }
          ],
          evaluate: [],
          consumption: [
            { required: true, message: '请输入人均消费', trigger: 'change' },
            { min: 2, max: 3, message: '长度在 2 到 3 个字符', trigger: 'blur' }
          ],
          avatar:[
            { required: true, message: '请上传图片', trigger: 'change' }
          ],
        },
        action: 'http://localhost:3000/sendAvatar',
        fullscreenLoading: false
      };
    },
    methods: {
      //表单提交
      submitForm(formName) {
        this.fullscreenLoading = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('valid',valid)
            console.log('formName', formName)
            // valid.append('avatar', this.base64Url)
            // console.log(typeof this.ruleForm.date)
            addRestaurant(this.ruleForm).then(res => {
              console.log(res)
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              setTimeout(() => {
                this.fullscreenLoading = false
                this.$router.push('/RestaurantList')
              }, 500);
            }).catch(err => {
              this.fullscreenLoading = false
              throw err
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //提示定位
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //分数
      rateChange() {
        console.log(this.value1)
      },
      handleAvatarSuccess(res, file) {
        console.log('res', res)
        console.log('file', file)
        this.ruleForm.avatar = URL.createObjectURL(file.raw);
        this.getBase64(file.raw).then(res => {
          this.ruleForm.avatar = res
          console.log('base64 res', res)
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
      //图片转base64
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
    }
  }
</script>

<style scoped>
.addRestaurant{
  background: #fff;
  padding: 20px;
}
.restaurantName {
  width: 400px;
}
.rate {
  line-height: 1;
    vertical-align: middle;
    display: inline-block;
}
.avatar-uploader-title {
  width: 100px;
  display: inline-block;
  text-align: right;
    vertical-align: middle;
    /* float: left; */
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.avatar-uploader {
  display: inline-block;
  /* border: 1px solid #606266; */
}
.avatar-uploader .el-upload {
    border: 1px dashed #606266;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>