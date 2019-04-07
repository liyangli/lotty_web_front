<template>
    <div style="height: 100%;width:100%;">
        <el-row :gutter="20" >
            <el-col :span="6">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span >用户数据</span>
                    </div>
                    <div class="tabOne blue">
                        <div class="tabTitle">今日注册</div>
                        <div class="circle top"></div>
                        <div class="circle bottom"></div>
                        <div class="tabContent">
                            <span class="content">{{userStatistics.todayNum}}</span><span class="unit">人</span>
                        </div>
                    </div>
                    <div class="tabOne orange">
                        <div class="tabTitle">本周注册</div>
                        <div class="circle top"></div>
                        <div class="circle bottom"></div>
                        <div class="tabContent">
                            <span class="content">{{userStatistics.weekNum}}</span><span class="unit">人</span>
                        </div>
                    </div>
                    <div class="tabOne green">
                        <div class="tabTitle">本月注册</div>
                        <div class="circle top"></div>
                        <div class="circle bottom"></div>
                        <div class="tabContent">
                            <span class="content">{{userStatistics.monthNum}}</span><span class="unit">人</span>
                        </div>
                    </div>


                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card class="box-card" shadow="never" >
                    <div slot="header" class="clearfix">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="用户列表" name="betUser"></el-tab-pane>
                            <el-tab-pane label="彩种数据" name="lotno"></el-tab-pane>

                        </el-tabs>
                        <div v-if="activeName == 'betUser'" class="content-statistics">
                            <span >投注金额(元)</span><span class="">{{betUserStatistics.amtCnt/100}}</span> &nbsp;&nbsp;
                            <span>中奖金额(元)</span>
                            <span>{{betUserStatistics.orderaftprizeamtCnt/100}}</span>
                        </div>
                        <div class="search-statistics">
                            <span style="float: right">
                            <el-date-picker
                                    v-model="date"
                                    type="date"
                                    size="mini"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </span>
                        </div>


                    </div>
                    <!--内容展示-->
                    <div>
                        <div v-if="activeName=='betUser'">
                            <el-table
                                    :data="betUserStatistics.list"
                                    style="width: 100%">
                                <el-table-column
                                        prop="username"
                                        label="用户名">
                                </el-table-column>
                                <el-table-column
                                        prop="amt"
                                        label="投注金额"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="orderaftprizeamt"
                                        label="中奖金额"
                                        width="180">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-if="activeName=='lotno'">
                            <el-table
                                    :data="lotnos"
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
                        </div>
                    </div>

                </el-card>
            </el-col>
        </el-row>


    </div>

</template>
<script type="text/ecmascript-6">
    import moment from 'moment';
    import { findUserStatistics,doQueryStatistics } from '../../api/api';
    export default {
        data() {
            return {
                activeName: "betUser",
                curPage: 1,
                pageSize:10,
                userStatistics: {
                    "monthNum": 0,
                    "todayNum": 0,
                    "totalResult": 0,
                    "value": 0,
                    "weekNum": 0
                },
                betUserStatistics: {
                    amtCnt: 0.0,
                    orderaftprizeamtCnt: 0.0,
                    list: []
                },
                date:moment().add(-1,"days"),
                betUsers: [],
                lotnos: []

            }
        },
        components: {

        },
        watch: {
          "date": function(newVal,oldVal){
              //变化自动请求获取数据
              console.info("newVal-->"+newVal);
              this.doQueryStatistics();
          }
        },
        methods: {

            handleClick(){
                //菜单点击事件
                console.info("activeName:"+this.activeName);
//                this.doQueryStatistics();
            },
            init(){
                //初始化基础数据
                console.info(this.date);
            },
            //初始化查询左侧统计数据
            doQuery(){
                let self = this;
                findUserStatistics().then((data)=>{
                    data = data.data;
                    let error = data.error_code;
                    if(error != 0){
                        self.$message.error(data.msg);
                        return;
                    }
                    self.userStatistics = data.data;
                });
            },

            /**
             * 查询统计数据，根据类型不同查询请求；
             */
            doQueryStatistics(){
                let self = this;
                let param = {
                    date: moment(self.date).format("YYYY-MM-DD"),
                    curPage: self.curPage,
                    pageSize: self.pageSize
                };
                doQueryStatistics(self.activeName,param).then((result)=>{
                    let data = result.data;
                    let error_code = data.error_code;
                    if(error_code != 0){
                        self.$message.error(data.msg);
                        return;
                    }
                    let obj = data.data;
                    if(self.activeName == "betUser"){
                        //进行循环遍历，计算投注、中奖金额
                        let list = obj.list;
                        for(let betObj of list){
                            betObj.amt = betObj.amt/100;
                            betObj.orderaftprizeamt = betObj.orderaftprizeamt/100;
                        }
                        self.betUserStatistics = obj;
                    }else if (self.activeName == "lotno"){

                    }

                });

            }

        },
        mounted() {
            /**
             * 处理步骤：
             * 1、获取所有的统计数据；
             * 2、获取对应用户列表数据；
             */
            this.init();
            this.doQuery();
            this.doQueryStatistics();

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
        /*display: inline-block;*/
        /*height: calc(100% - 40px);*/
        width: calc(64% - 20px);
        float: right;
        /*border-radius:3px;*/
        /*padding: 35px 0 0 20px;*/
        line-height: 120px;
    }
    .content{
        /*display: block;*/
        height: 30px;
        font-size: 25px;
    }


    .content-statistics {
        float: left;
    }

    .search-statistics{
        float: right;
    }

</style>