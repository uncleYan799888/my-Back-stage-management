<template>
  <div class="addRestaurant">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="餐馆店名" prop="shopname">
      <el-input v-model="ruleForm.shopname" class="restaurantName"></el-input>
    </el-form-item>
    <el-form-item label="餐馆老板" prop="name">
      <el-input v-model="ruleForm.name" class="restaurantName"></el-input>
    </el-form-item>
    <el-form-item label="所在区域" prop="region" required>
      <el-select v-model="ruleForm.place" placeholder="请选择所在区域">
        <el-option label="罗湖区" value="a"></el-option>
        <el-option label="南山区" value="b"></el-option>
        <el-option label="宝安区" value="c"></el-option>
        <el-option label="龙华区" value="d"></el-option>
        <el-option label="福田区" value="e"></el-option>
        <el-option label="龙岗区" value="f"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="开张日期" required>
      <!-- <el-col :span="11"> -->
        <el-form-item prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 200px;"></el-date-picker>
        </el-form-item>
      <!-- </el-col> -->
      <!-- <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col> -->
    </el-form-item>
    <!-- <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item> -->
    <!-- <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item> -->
    <el-form-item label="餐馆类型" prop="resource" required>
      <el-radio-group v-model="ruleForm.type">
        <el-radio label="猪脚饭" value='zhujiaofan'></el-radio>
        <el-radio label="三及第" value='sanjidi'></el-radio>
        <el-radio label="麻辣烫"></el-radio>
        <el-radio label="重庆小面"></el-radio>
        <el-radio label="家乐缘"></el-radio>
        <el-radio label="沙县小吃"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label='整体评分' prop='evaluate' required>
      <el-rate v-model="ruleForm.evaluate" class="rate" @change='rateChange' show-score text-color="#ff9900"></el-rate>
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
    data() {
      return {
        ruleForm: {
          shopname: '',
          place: '',
          date: '',
          type: '',
          address: '',
          evaluate: 0,
          name: ''
        },
        rules: {
          shopname: [
            { required: true, message: '请输入餐馆店名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入餐馆老板姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          place: [
            { required: true, message: '请选择餐馆区域', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择开张日期', trigger: 'change' }
          ],
          // date2: [
          //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          // ],
          // type: [
          //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          // ],
          type: [
            { required: true, message: '请选择餐馆类型', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请填写详细地址', trigger: 'blur' },
            { min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur' }
          ],
          evaluate: []
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(typeof this.ruleForm.date)
            addRestaurant(this.ruleForm).then(res => {
              console.log(res)
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }).catch(err => {
              throw err
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      rateChange() {
        console.log(this.value1)
      }
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
</style>