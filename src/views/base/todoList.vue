<template>
    <div class="todoList">
        <div class="top">
            <div class="top_title">待办</div>
            <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/baseHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>待办</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="'待办' + '（' + notDone.length + '）'" name="first">
                <div class="first">
                    <div class="first_item" v-for="(item, index) in notDone" :key="index">
                        <div class="first_item_msg">
                            <span class="first_item_msg_detailed">{{item.event_detailed}}</span>
                            <el-tag type="danger" v-if="item.type === 'c'">被驳回</el-tag>
                        </div>
                        <div class="first_item_time">
                            <div><span>{{item.event_time}}</span></div>
                            <el-button size='small' class="first_item_time_btn" @click="submit(item.eid)">已处理</el-button>
                        </div>
                    </div>
                    <el-button type='primary' @click="open('全部标为已读')">全部标为已读</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="'待管理员审批' + '（' + notPass.length + '）'" name="second">
                <div class="first">
                    <div class="first_item" v-for="(item, index) in notPass" :key="index">
                        <div class="first_item_msg">{{item.event_detailed}}</div>
                        <div class="first_item_time">
                            <div>{{item.event_time}}</div>
                            <el-button size='small' class="first_item_time_btn">查看原因</el-button>
                            <el-button size='small'>已处理</el-button>
                        </div>
                    </div>
                    <el-button type='danger' @click="open('全部删除')">全部删除</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="'已完成' + '（' + AlreadyDone.length + '）'" name="third">
                <div class="first">
                    <div class="first_item" v-for="(item, index) in AlreadyDone" :key="index">
                        <div class="first_item_msg">{{item.event_detailed}}</div>
                        <div class="first_item_time">
                            <div>{{item.event_time}}</div>
                            <el-button size='small' class="first_item_time_btn" @click="oneEven('Deleted', index)">还原</el-button>
                        </div>
                    </div>
                    <el-button type='danger' @click="open('清空回收站')">清空回收站</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import axios from 'axios'
import {todoSubmission,todoList} from '../../api/todolist/api'
export default {
    data() {
        return {
            activeName: 'first',
            notDone: [],
            notPass: [],
            AlreadyDone:[],
        }
    },
    created() {
        this.getTodoList()
    },
    methods: {
        handleClick(tab, event) {
        console.log(tab, event)
    },
        oneEven(name,index) {
        let obj
        if (name === 'first') {
        obj = this.first.splice(index, 1)
        this.second = this.second.concat(obj)
        } else if (name === 'second') {
        obj = this.second.splice(index, 1)
        this.Deleted = this.Deleted.concat(obj)
        } else {
        obj = this.Deleted.splice(index, 1)
        this.second = this.second.concat(obj)
        }
    },
    evenALL(name) {
        if (name === '全部标为已读') {
            this.second = this.second.concat(this.first)
            this.first = []
        } else if (name === '全部删除') {
            this.Deleted = this.Deleted.concat(this.second)
            this.second = []
        } else {
            this.Deleted = []
        }
    },
    open(name) {
        this.$confirm(`确定${name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            this.evenALL(name)
        this.$message({
            type: 'success',
            message: '操作成功!'
        });
        }).catch(() => {
        this.$message({
            type: 'info',
            message: '已取消'
        });          
        });
    },
    getTodoList() {
        todoList().then(res => {
            console.log(res)
            this.notDone = res.data.notDone
            this.notPass = res.data.notPass
            this.AlreadyDone = res.data.AlreadyDone
            // this.second = res.data.data.second
            // this.Deleted = res.data.data.Deleted
        }).catch(err => {
            console.log(err)
        })
    },
    submit(eid) {
        this.$confirm('确认提交？').then(_=>{
            todoSubmission({eid:eid}).then(res =>{
            alert(res.data.msg)
            this.getTodoList()
        }).catch(err =>{
            throw err
        })
        }).catch(_=> {})
    }
    }
}
</script>

<style scoped>
.todoList {
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
.first_item {
    display: flex;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    justify-content: space-between;
    margin-bottom: 10px;
}
.first_item_msg {
    color: #2D8CF0;
}
.first_item_msg:hover {
    cursor: pointer;
}
.first_item_time {
    display: flex;
}
.first_item_time_btn {
    flex: 1;
    margin-left: 50px;
}
.first_item_msg_detailed{
    margin-right: 10px;
}
</style>