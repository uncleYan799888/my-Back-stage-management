<template>
  <div class="Internationalization">
    <div class="top">
        <div class="top_title">国际化功能</div>
        <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/baseHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>国际化功能</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div>
      <span>{{$t('message.introduce')}}</span>
      <el-button type='primary' @click="langChange()">{{buttonV | switch}}</el-button>
      <!-- <el-button type='primary' @click="langChange('en')" v-else>{{buttonV | switch}}</el-button> -->
    </div>
    <div class="text_group">
      <div class="text_item_songName">{{$t('message.songName')}}</div>
      <div class="text_item">{{$t('message.Lyric1')}}</div>
      <div class="text_item">{{$t('message.Lyric2')}}</div>
      <div class="text_item">{{$t('message.Lyric3')}}</div>
      <div class="text_item">{{$t('message.Lyric4')}}</div>
      <div class="text_item">{{$t('message.Lyric5')}}</div>
      <div class="text_item">{{$t('message.Lyric6')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    switch(value) {
      if(value === 'cn') {
        return '中文'
      }else {
        return 'english'
      }
    }
  },
  data() {
    return {
      title: 'a',
      buttonV: ''
    }
  },
  created() {
    let that = this;
        console.log(localStorage.lang)
        that.buttonV = localStorage.lang == undefined?'cn':localStorage.lang
  },
  methods: {
    langChange(){
        // console.log(e)
        if(this.buttonV === 'en') {
          this.buttonV = 'cn'
        }else {
          this.buttonV = 'en'
        }
        localStorage.setItem('lang',this.buttonV);
        this.$i18n.locale = this.buttonV;
        }
  }
}
</script>
<style scoped>
.Internationalization {
  padding: 20px;
  background: #fff;
}
.top_title {
    font-size: 30px;
    font-weight: bold;
}
.breadcrumb {
    margin: 10px 0;
}
.text_group {
  margin-top: 20px;
}
.text_item {
  margin-top: 5px;
}
.text_item_songName {
  font-size: 20px;
  font-weight: bold;
  color: #545c64;
}
</style>