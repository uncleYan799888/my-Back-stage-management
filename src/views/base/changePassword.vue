<template>
  <div class="changePassword">
    <div class="top">
            <div class="top_title">修改密码</div>
            <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/baseHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    密码当然不给你改啦，小傻瓜~~
  </div>
</template>

<style scoped>
.changePassword{
  padding: 20px;
  background: #fff;
  height: 100%;
}
.top_title {
    font-size: 30px;
    font-weight: bold;
}
.breadcrumb {
    margin: 10px 0;
}
</style>