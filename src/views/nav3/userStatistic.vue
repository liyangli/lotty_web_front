<template>
    <div style="height: 100%;width:100%;">
        <el-row :gutter="20" >
            <el-col :span="6">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span >出票数据</span>
                    </div>
                    <div class="tabOne blue">
                        <div class="tabTitle">今日出票</div>
                        <div class="circle top"></div>
                        <div class="circle bottom"></div>
                        <div class="tabContent">
                            <span class="content">0单</span>
                            <span class="content">0.00元</span>
                        </div>
                    </div>
                    <div class="tabOne orange">
                        <div class="tabTitle">今日出票</div>
                        <div class="circle top"></div>
                        <div class="circle bottom"></div>
                        <div class="tabContent">
                            <span class="content">0单</span>
                            <span class="content">0.00元</span>
                        </div>
                    </div>
                    <div class="tabOne green">
                        <div class="tabTitle">今日出票</div>
                        <div class="circle top"></div>
                        <div class="circle bottom"></div>
                        <div class="tabContent">
                            <span class="content">0单</span>
                            <span class="content">0.00元</span>
                        </div>
                    </div>


                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card class="box-card" shadow="never" >
                    <div slot="header" class="clearfix">
                        <span >总订单数  总金额</span>
                        <span style="float: right">
                            <el-date-picker
                                    v-model="date"
                                    type="date"
                                    size="mini"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </span>

                    </div>
                    <template>
                        <el-table
                                :data="tableData"
                                style="width: 100%">
                            <el-table-column
                                    prop="date"
                                    label="日期"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="地址">
                            </el-table-column>
                        </el-table>
                    </template>
                </el-card>
            </el-col>
        </el-row>


    </div>

</template>
<script type="text/ecmascript-6">
    import moment from 'moment';
    export default {
        data() {
            return {
                date:null,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        components: {

        },
        methods: {

        },
        mounted() {

        },
        created(){
            let self = this;

        }
    };

</script>

<style>
    .blue{
        background: #8183fe;
    }
    .orange{
        background-color: #fda482;
    }
    .green{
        background: #4dd398;
    }
    .tabOne{
        height: 120px;
        width: 100%;
        color:#fff;
        position: relative;
        margin-bottom: 20px;
    }
    .tabTitle{
        display: inline-block;
        height: 100%;
        line-height:120px;
        text-align: center;
        width: 35%;
        border-radius:3px;
        border-right: 1px dashed #fff;
    }
    .circle{
        width:10px;
        height:10px;
        border-radius:50%;
        position:absolute;
        right:63%;
        background-color:#fff;
    }
    .top{
        top:-5px;
    }
    .bottom{
        bottom:-5px;
    }
    .tabContent{
        display: inline-block;
        height: calc(100% - 40px);
        width: calc(64% - 20px);
        float: right;
        border-radius:3px;
        padding: 35px 0 0 20px;
    }
    .content{
        display: block;
        height: 30px;
    }

</style>