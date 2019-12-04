<template>
    <div class="todoList">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="'未读消息' + '（' + first.length + '）'" name="first">
                <div class="first">
                    <div class="first_item" v-for="(item, index) in first" :key="index">
                        <div class="first_item_msg">{{item.msg}}</div>
                        <div class="first_item_time">
                            <div>{{item.time}}</div>
                            <el-button size='small' class="first_item_time_btn" @click="oneEven('first', index)">标为已读</el-button>
                        </div>
                    </div>
                    <el-button type='primary' @click="open('全部标为已读')">全部标为已读</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="'已读消息' + '（' + second.length + '）'" name="second">
                <div class="first">
                    <div class="first_item" v-for="(item, index) in second" :key="index">
                        <div class="first_item_msg">{{item.msg}}</div>
                        <div class="first_item_time">
                            <div>{{item.time}}</div>
                            <el-button size='small' class="first_item_time_btn" type='danger' @click="oneEven('second', index)">删除</el-button>
                        </div>
                    </div>
                    <el-button type='danger' @click="open('全部删除')">全部删除</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="'回收站' + '（' + Deleted.length + '）'" name="third">
                <div class="first">
                    <div class="first_item" v-for="(item, index) in Deleted" :key="index">
                        <div class="first_item_msg">{{item.msg}}</div>
                        <div class="first_item_time">
                            <div>{{item.time}}</div>
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
export default {
    data() {
        return {
            activeName: 'first',
            first: [],
            second: [],
            Deleted:[],
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
        axios.get('http://localhost:3000/todoList').then(res => {
            console.log(res)
            this.first = res.data.data.first
            this.second = res.data.data.second
            this.Deleted = res.data.data.Deleted
        }).catch(err => {
            console.log(err)
        })
    }
    }
}
</script>

<style scoped>
.todoList {
    padding: 20px;
    background: #fff;
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
</style>