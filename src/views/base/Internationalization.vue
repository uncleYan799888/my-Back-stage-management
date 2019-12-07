<template>
  <div class="Internationalization">
    <!-- <div>屋檐如悬崖风铃如沧海我等燕归来
    时间被安排演一场意外你悄然走开</div>
    <div>故事在城外浓雾散不开看不清对白，你听不出来风声不存在是我在感慨</div>
    <div>梦醒来是谁在窗台把结局打开，那薄如蝉翼的未来经不起谁来拆</div>
    <div>我送你离开千里之外你无声黑白，沉默年代或许不该太遥远的相爱</div>
    <div>我送你离开天涯之外你是否还在，琴声何来生死难猜用一生去等待</div>
    <div>闻泪声入林寻梨花白只得一行青苔，天在山之外雨落花台我两鬓斑白</div>
    <div>闻泪声入林寻梨花白只得一行青苔，天在山之外雨落花台我等你来</div> -->
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