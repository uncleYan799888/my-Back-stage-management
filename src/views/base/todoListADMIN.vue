<template>
    <div class="todoList">
        <div class="top">
            <div class="top_title">管理员待办</div>
            <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/baseHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员待办</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="button_add">
            <el-button @click="dialogVisibleAddEvent = true">添加事项</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="'未处理' + '（' + notDone.length + '）'" name="first">
                <div class="first">
                    <div class="first_item" v-for="(item, index) in notDone" :key="index">
                        <div class="first_item_msg" @click="showDialogVisible(item)">{{item.event_detailed}}</div>
                        <div class="first_item_time">
                            <div><span>{{item.event_time}}</span></div>
                            <el-button size='small' class="first_item_time_btn" @click="oneEven('first', index)">已处理</el-button>
                        </div>
                    </div>
                    <!-- <el-button type='primary' @click="open('全部标为已读')">全部标为已读</el-button> -->
                </div>
            </el-tab-pane>
            <el-tab-pane :label="'已驳回' + '（' + notPass.length + '）'" name="second">
                <div class="first">
                    <div class="first_item" v-for="(item, index) in notPass" :key="index">
                        <div class="first_item_msg">{{item.event_detailed}}</div>
                        <div class="first_item_time">
                            <div>{{item.event_time}}</div>
                            <el-button size='small' class="first_item_time_btn">查看原因</el-button>
                            <el-button size='small'>已处理</el-button>
                        </div>
                    </div>
                    <!-- <el-button type='danger' @click="open('全部删除')">全部删除</el-button> -->
                </div>
            </el-tab-pane>
            <el-tab-pane :label="'已完成' + '（' + pass.length + '）'" name="third">
                <div class="first">
                    <div class="first_item" v-for="(item, index) in pass" :key="index">
                        <div class="first_item_msg">{{item.event_detailed}}</div>
                        <div class="first_item_time">
                            <div>{{item.event_time}}</div>
                            <el-button size='small' class="first_item_time_btn" @click="oneEven('Deleted', index)">还原</el-button>
                        </div>
                    </div>
                    <!-- <el-button type='danger' @click="open('清空回收站')">清空回收站</el-button> -->
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div>事件ID:  {{dialogVisibleMsg.eid}}</div>
            <div>事件内容：{{dialogVisibleMsg.event_detailed}}</div>
            <div>事件事件：{{dialogVisibleMsg.event_time}}</div>
            <div>提交人员： {{dialogVisibleMsg.personnel_name}}</div>
            <div>驳回原因：<el-input v-model="dialogVisibleMsg.reason" type="textarea" :rows="2"
            maxlength="30" show-word-limit resize='none'></el-input></div>
            <div class="input_check" v-if="showReasonCheck">请输入5位以上驳回原因</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Reject" type='danger'>驳 回</el-button>
                <el-button type="primary" @click="toPass">通 过</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加事项" :visible.sync='dialogVisibleAddEvent' width="30%" :before-close="handleClose">
            <div>执行人员：
                <el-select v-model="AddEventobj.uid" @change="AddEventChange">
                    <el-option v-for="item in AddEventOption" :key="item.value" :label='item.label' :value='item.value'></el-option>
                </el-select>
            </div>
            <div>事项内容：<el-input v-model="AddEventobj.event_detailed" type="textarea" :rows="2"
            maxlength="30" show-word-limit resize='none' placeholder='请填写事项内容'></el-input></div>
            <div class="input_check" v-if="AddEventDetailCheck">请输入7位以上事项内容</div>
            <span slot="footer" class="dialog-footer">
                <el-button type='primary' @click="todoAddCheck">添加</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import axios from 'axios'
import {todoListADMIN,todoReject,todoAdd} from '../../api/todoList/api'
export default {
    data() {
        return {
            activeName: 'first',
            notDone: [],
            notPass: [],
            pass:[],
            dialogVisible: false,
            dialogVisibleMsg: {
                event_detailed: '',
                event_time: '',
                eid: 0,
                personnel_account: '',
                reason: ''
            },
            dialogVisibleReason: '',
            showReasonCheck: false,
            dialogVisibleAddEvent: false,
            AddEventOption: [{
                value: '2',
                label: '张学友'
            },{
                value: '15',
                label: '古天乐'
            }],
            AddEventobj: {
                uid: '',
                event_detailed: ''
            },
            AddEventDetailCheck: false
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            todoListADMIN().then(res =>{
            this.notDone = res.data.notDone
            this.notPass = res.data.notPass
            this.pass = res.data.pass
        }).catch(err => {
            throw err
        })
        },
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
    handleClose(done) {
        // this.$confirm('确认关闭？')
        // .then(_ => {
        //     console.log('done',done)
            done()
        // })
        // .catch(_ => {});
    },
    showDialogVisible(item){
        console.log('item',item)
        this.dialogVisibleMsg.eid = item.eid
        this.dialogVisibleMsg.event_detailed = item.event_detailed
        this.dialogVisibleMsg.event_time = item.event_time
        this.dialogVisibleMsg.personnel_name = item.personnel_name
        this.dialogVisibleMsg.personnel_account = item.personnel_account
        this.dialogVisibleMsg.reason = item.reason
        this.dialogVisibleMsg.type = item.type
        this.dialogVisible = true
    },
    Reject() {
        if(this.dialogVisibleMsg.reason.length<= 5 ){
            this.showReasonCheck = true
        } else {
            this.$confirm('确认驳回？').then(_ => {
                todoReject({eid:this.dialogVisibleMsg.eid,reason: this.dialogVisibleMsg.reason,method:'r'}).then(res => {
                    // alert('操作成功')
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.getData()
                    this.dialogVisible = false
                }).catch(err => {
                    throw err
                })
            }).catch(_ =>{})
        }
    },
    toPass() {
        todoReject({eid:this.dialogVisibleMsg.eid,method: 'p'}).then(res =>{
            this.$message({
                type: 'success',
                message: '操作成功'
            })
            this.getData()
            this.dialogVisible = false
        }).catch(err =>{
            throw err
        })
    },
    todoAddCheck() {
        if(this.AddEventobj.event_detailed.length<8){
            this.AddEventDetailCheck = true
        }else{
            todoAdd(this.AddEventobj).then(res =>{
                this.$message({
                    type: 'success',
                    message: '添加成功'
                })
                this.dialogVisibleAddEvent = false
            }).catch(err=>{
                throw err
            })
        }
    },
    AddEventChange(item) {
        console.log('item', item)
        // this.AddEventobj
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
.input_check {
    color: red;
    font-size: 12px;
}
.button_add{
    margin-top: 10px;
}
</style>