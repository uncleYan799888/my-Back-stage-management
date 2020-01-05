<template>
    <div>
        <div class="top">
            <div class="top_title">首页</div>
        </div>
        <div class="a">
            <div class="left">
                <div class="left_1">
                    <div class="left_top">
                    <div class="left_a">
                        <el-avatar :size="100" :src="avatar" @error="errorHandler"></el-avatar>
                    </div>
                    <div class="left_b">
                        <div class="left_b_a">{{ name }}</div>
                        <p class="left_b_b">{{ identity }}</p>
                    </div>
                </div>
                <div class="left_bottom">
                    <div>上次登录时间<span class="left_bottom_right">2019-10-10</span></div>
                    <div>上次登录地点<span class="left_bottom_right">深圳</span></div>
                </div>
                </div>
                <div></div>
                <div class="left_2">
                    <div class="left_2_top">
                        <div>语言详情</div>
                    </div>
                    <div class="left_2_bottom">
                        <div>
                            <div>vue</div>
                            <div><el-progress :percentage="60"></el-progress></div>
                        </div>
                        <div>
                            <div>javascript</div>
                            <div><el-progress :percentage="60"></el-progress></div>
                        </div>
                        <div>
                            <div>css</div>
                            <div><el-progress :percentage="60"></el-progress></div>
                        </div>
                        <div>
                            <div>html</div>
                            <div><el-progress :percentage="60"></el-progress></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <el-row class="right_top_group">
                    <el-col :span="8">
                        <div class="right_item">
                            <i class="el-icon-view right_icon right_icon_out_a"></i>
                            <div class="right_item_font">
                                <div class="right_item_font_a font_colora">1111</div>
                                <div class="right_item_font_b">用户访问量</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="right_item">
                            <i class="el-icon-bell right_icon right_icon_out_b"></i>
                            <div class="right_item_font">
                                <div class="right_item_font_a font_colorb">1111</div>
                                <div class="right_item_font_b">用户访问量</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="right_item right_item_final">
                            <i class="el-icon-news right_icon right_icon_out_c"></i>
                            <div class="right_item_font">
                                <div class="right_item_font_a font_colorc">1111</div>
                                <div class="right_item_font_b">用户访问量</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="right_bottom">
                    <div class="right_bottom_top">
                        <div class="right_bottom_top_a">待办事项</div>
                        <div class="right_bottom_top_b">添加</div>
                    </div>
                    <div class="right_bottom_bottom">
                        <div class="right_bottom_bottom_item" v-for="(item, index) in check" :key="index">
                            <el-checkbox v-model="item.checked">今天要修100个bug</el-checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
    ...mapState({
    name:state => state.userInfo.name,
    identity: state => state.userInfo.identity,
    avatar: state => state.userInfo.avatar
    })
},
    data() {
        return {
            check: [
                {checked: true},
                {checked: true},
                {checked: false},
                {checked: false},
                {checked: false},
                {checked: false}
            ]
            // identity: ''//身份
        }
    },
    methods: {
        errorHandler() {
        return true
    }
    }
}
</script>

<style scoped>
.top {
    /* margin: 0px 0px 0px; */
    padding: 10px;
    background: #fff;
}
.top_title {
    font-size: 30px;
    font-weight: bold;
}
.a{
    display: flex;
}
.left{
    width: 29%;
    
}
.left_1 {
    background: #fff;
    padding: 20px;
    /* border: 1px solid red; */
    /* background: #fff; */
    /* margin-top: 10px; */
    /* margin-left: 10px; */
}
.left_top {
    display: flex;
    padding-bottom: 20px;
    border-bottom: 2px solid #cfd2df;
}
.right{
    width: 70%;
    /* margin-top: 10px; */
    /* padding-right: 10px; */
}
.left_a {
    /* width: 100px;
    height: 100px;
    border-radius: 50%;
    background: red; */
    margin-right: 40px;
}
.left_b {
    margin-top: 20px;
}
.left_b_a{
    font-size: 30px;
    font-weight: bold;
}
.left_b_b{
    font-size: 14px;
    color: #666;
}
.left_bottom {
    margin-top: 20px;
    color: #666;
    font-size: 14px;
}
.left_bottom_right {
    margin-left: 56px;
}
.right_icon {
    font-size: 50px;
    color: #fff;
}
.right_icon_out_a {
    width: 100px;
    background: #2D8CF0;
    height: 100px;
    line-height: 100px;
    text-align: center;
    /* text-align: center; */
}
.font_colora {
    color: #2D8CF0;
}
.right_icon_out_b {
    width: 40%;
    background: #64D572;
    height: 100px;
    line-height: 100px;
    text-align: center;
    /* align-items: center; */
    /* text-align: center; */
}
.font_colorb {
    color: #64D572;
}
.right_icon_out_c {
    width: 40%;
    background: #F25E43;
    height: 100px;
    line-height: 100px;
    text-align: center;
    /* text-align: center; */
}
.font_colorc {
    color: #F25E43;
}
.right_item {
    /* width: 33.3333%; */
    /* padding-right:10px; */
    margin-right: 10px;
    height: 100px;
    background: #fff;
    /* line-height: 100px; */
    display: flex;
    align-items: center;
}
.right_item_final {
    margin-right: 0px;
}
.right_item_font {
    text-align: center;
    flex: 1;
}
.right_item_font_a {
    font-size: 30px;
    font-weight: bold;
    /* height: 20px; */
    /* color: #2D8CF0; */
    /* margin-bottom: 5px; */
}
.right_item_font_b {
    font-size: 16px;
    margin-top: 5px;
    color: #666;
    /* height: 16px; */
}
.left_2 {
    height: 220px;
    margin-top: 20px;
    background: #fff;
    /* margin-left: 10px; */
    padding: 20px;
    margin-bottom: 20px;
}
.left_2_top {
    border-bottom: 1px solid #cfd2df;
    padding-bottom: 20px;
}
.left_2_bottom {
    padding-top: 20px;
}
.right_top_group {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.right_bottom {
    height: 340px;
    /* width: 100%; */
    margin-top: 20px;
    background: #fff;
    padding: 20px;
}
.right_bottom_top {
    /* border: 1px solid #000; */
}
.right_bottom_top_a {
    float: left;
}
.right_bottom_top_b {
    float: right;
}
.right_bottom_bottom {
    margin-top: 50px;
    border-top: 1px solid #cfd2df;
    padding-top: 20px;
}
.right_bottom_bottom_item {
    padding: 10px 0;
    /* border-bottom: 1px solid #cfd2df; */
}
</style>