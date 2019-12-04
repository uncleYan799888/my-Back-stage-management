<template>
    <div class="TopLevelBar">
        <!-- <div class="TopLevelBarTitle" @click="back">{{title}}</div> -->
        <div class="TopLevelBarInfo">
          <div class="TopLevelBarInfoVartar">
            <el-avatar :size="50" fit="fill" src="http://localhost:8080/avatar.jpg"></el-avatar>
          </div>
          <div class="TopLevelBarInfoName">{{userAccount}}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      userAccount:state => state.userAccount
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
  /* width: 30px;
  height: 30px; */
  /* border-radius: 50%; */
  /* background: #333; */
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
</style>