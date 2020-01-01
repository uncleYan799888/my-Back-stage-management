<template>
    <div class="form">
        <div class="top">
            <div class="top_title">餐馆列表</div>
            <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/baseHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>深圳餐馆整理</el-breadcrumb-item>
            <el-breadcrumb-item>餐馆列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="select">
            <div class="select">
                <el-select v-model="parame.region" placeholder="请选择区域" @change='searchFood'>
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="submit">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="dataTable"
                style="width: 100%">
                <el-table-column label="照片" width='60' align='center'>
                    <template slot-scope="scope">
                        <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
                        <el-avatar :size="50" :src="scope.row.avatar" shape="square" @error="errorHandler"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="shopname"
                    label="店名" width='100'
                    align='center'>
                </el-table-column>
                <el-table-column
                    prop="opentime"
                    label="营业时间" width='200'
                    align='center'>
                </el-table-column>
                <el-table-column
                    label="消费"
                    width='120'
                    align='center'>
                    <template slot-scope="scope">
                        <div>{{scope.row.consumption | consumptionTo}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="评价"
                    width='100'
                    align='center'>
                    <template slot-scope="scope">
                        <div>{{scope.row.evaluate | numTo}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                <el-table-column width='100'
                    label="操作" align='center'>
                    <template>
                        <el-button size='small' type='primary'>详细</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <!-- <span class="demonstration">完整功能</span> -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paging.current"
            :page-sizes="[5, 10, 15, 20]" :page-size="paging.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {FoodListInput, getData} from '../../api/restaurant/api'
export default {
    filters:{
        numTo(value) {
            return value.toFixed(1)
        },
        consumptionTo(value){
            return '人均：' + value.toFixed(1) + '元'
        }
    },
    computed:{
        //分页
        dataTable(){
            return this.tableData.slice((this.paging.current-1)*this.paging.size,this.paging.current*this.paging.size)
        }
    },
    data() {
        return {
            options1: [{
            value: 'a',
            label: '罗湖区'
            }, {
            value: 'e',
            label: '福田区'
            },
            {
            value: 'd',
            label: '龙华区'
            },
            {
            value: 'b',
            label: '南山区'
            },
            {
            value: 'c',
            label: '宝安区'
            },{
            value: 'f',
            label: '龙岗区'
            }],
            options2: [],
            parame: {
                region: '',
                food: ''
            },
            tableData: [],
            paging: {
                size: 5,  //每页数量
                current: 1, //初始页
                pageSize: 5
            }
            }
    },
    created() {
        getData({region: 'a'}).then(res => {
            this.tableData = res.data
        }).catch(err => {
            throw err
        })
    },
    methods: {
        search() {
            getData({place: this.parame.region,type:this.parame.food}).then(res => {
                this.tableData = res.data
            }).catch(err => {
                throw err
            })
        },
        searchFood() {
            this.options2 = []
            this.parame.food = ''
            FoodListInput({tableDataSelect:this.parame.region}).then(res => {
                console.log('a', res)
                this.options2 = res.data
            }).catch(err => {
                throw err
            })
        },
        handleSizeChange(val) {
            this.paging.size = val
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log('datatable', this.dataTable)
            this.paging.current = val
            console.log(`当前页: ${val}`);
        },
        errorHandler() {
        return true
    }
    }
}
</script>

<style scoped>
.form {
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
.select {
    display: flex;
}
.select {
    margin-right: 20px;
}
.table {
}
</style>