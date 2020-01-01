<template>
  <div class="starRestaurant">
    <div class="top">
        <div class="top_title">添加餐馆</div>
        <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/baseHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>深圳餐馆整理</el-breadcrumb-item>
        <el-breadcrumb-item>明星餐馆</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div>{{title}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'starRestaurant'
    }
  }
}
</script>

<style scoped>
.starRestaurant{
  background: #fff;
  padding: 20px;
}
.top_title {
    font-size: 30px;
    font-weight: bold;
}
.breadcrumb {
    margin: 10px 0;
}
</style>