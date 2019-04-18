<template>
    <div style="height: 100%;width:100%;">
        员工：
        <el-select v-model="userID" placeholder="请选择">
            <el-option
                    v-for="item in staffs"
                    :key="item.id"
                    :label="item.nickname"
                    :value="item.id">
            </el-option>
        </el-select>
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
                            <span >投注金额(元) </span><span class="amount">{{betUserStatistics.amtCnt/100}}</span> &nbsp;&nbsp;
                            <span>中奖金额(元) </span>
                            <span class="amount">{{betUserStatistics.orderaftprizeamtCnt/100}}</span>
                        </div>
                        <div v-if="activeName == 'lotno'" class="content-statistics">
                            <span >投注金额(元) </span><span class="amount">{{lotnoStatistics.amtCnt/100}}</span>
                        </div>
                        <div class="search-statistics">
                            <span style="float: right">
                                开始日期：
                                 <el-date-picker
                                         v-model="startDate"
                                         type="date"
                                         size="mini"
                                         placeholder="开始日期">
                            </el-date-picker>
                                结束日期：
                            <el-date-picker
                                    v-model="endDate"
                                    type="date"
                                    size="mini"
                                    placeholder="结束日期">
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
                                        align="center"
                                        prop="username"
                                        label="用户名">
                                </el-table-column>
                                <el-table-column
                                        prop="amt"
                                        align="center"
                                        label="投注金额">
                                </el-table-column>
                                <el-table-column
                                        prop="orderaftprizeamt"
                                        align="center"
                                        label="中奖金额">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-if="activeName=='lotno'">
                            <el-table
                                    :data="lotnoStatistics.list"
                                    style="width: 100%">
                                <el-table-column
                                        prop="lotnoName"
                                        align="center"
                                        label="彩种类型">
                                </el-table-column>
                                <el-table-column
                                        prop="amt"
                                        align="center"
                                        label="投注金额">
                                </el-table-column>
                                <el-table-column
                                        prop="time"
                                        align="center"
                                        label="统计时间">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="block">
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync=curPage
                                :page-size=pageSize
                                layout="total, prev, pager, next"
                                :total=total>
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>
<script type="text/ecmascript-6">
    import moment from 'moment';
    import { findUserStatistics,doQueryStatistics,getStaffList } from '../../api/api';
    import {findTypes} from '../../api/api';
    export default {
        data() {
            return {
                activeName: "betUser",
                curPage: 1,
                pageSize:10,
                total:0,
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
                lotnoStatistics:{
                    amtCnt: 0.0,
                    list: []
                },
                startDate:moment().add(-1,"days"),
                endDate:moment().add(0,"days"),
                types:[],
                staffs:[],
                userID:null
            }
        },
        components: {

        },
        watch: {
          "startDate": function(newVal,oldVal){
              //变化自动请求获取数据
              console.info("newVal-->"+newVal);
              this.doQueryStatistics();
          },
            "endDate": function(newVal,oldVal){
                //变化自动请求获取数据
                console.info("newVal-->"+newVal);
                this.doQueryStatistics();
            },
            "userID": function(newVal,oldVal){
                //变化自动请求获取数据
                console.info("newVal-->"+newVal);
                this.doQuery();
                this.doQueryStatistics();
            }
        },
        methods: {
            handleCurrentChange(val){
                this.curPage = val;
                this.doQueryStatistics();
            },
            handleClick(){
                //菜单点击事件
                console.info("activeName:"+this.activeName);
                this.total = 0;
                if(this.curPage == 1){
                    this.doQueryStatistics();
                }else{
                    this.curPage = 1;
                }
            },
            init(){
                //初始化基础数据
                this.findTypes();
                this.getStaffs();
            },
            makeData(data) {
                var pos = {};
                var tree = [];
                var i = 0;
                while (data.length != 0) {
                    if (data[i].pid == null) {
                        tree.push({
                            id: data[i].id,
                            name: data[i].name,
                            checked:false
                        });
                        pos[data[i].id] = [tree.length - 1];
                        data.splice(i, 1);
                        i--;
                    }else {
                        var posArr = pos[data[i].pid];
                        if (posArr != undefined) {

                            var obj = tree[posArr[0]];
                            for (var j = 1; j < posArr.length; j++) {
                                obj = obj.subTypes[posArr[j]];
                            }

                            if (!obj.subTypes) {
                                obj.subTypes = [];
                            }
                            obj.subTypes.push({
                                id: data[i].id,
                                name: data[i].name,
                                pid: data[i].pid,
                                checked: false
                            });
                            pos[data[i].id] = posArr.concat([obj.subTypes.length - 1]);
                            data.splice(i, 1);
                            i--;
                        }
                        i++;
                        if (i > data.length - 1) {
                            i = 0;
                        }
                    }
                }
                return tree;
            },
            findTypes(){
                let self = this;
                findTypes().then((result)=>{
                    self.types = self.makeData(result.data);
                });
            },
            getTypeName(typeID){
                let self = this;
                let name = "";
                let pid = null;
                for(let each of self.types){
                    for(let lotno of each.subTypes){
                        if(lotno.id == typeID){
                            pid = each.id;
                            name = each.name+" "+lotno.name;
                            break
                        }
                        if(lotno.subTypes){
                            for(let third of lotno.subTypes){
                                if(third.id == typeID){
                                    pid = each.id;
                                    name = each.name+" "+lotno.name+" "+third.name;
                                    break
                                }
                            }
                        }

                    }
                }
                return name;
            },
            getStaffs(){
                let self = this;
                getStaffList().then(data => {
                    let { msg, error_code } = data;
                    if (error_code == 1) {
                        this.$message({
                            message: msg,
                            type: "error"
                        });
                        return;
                    }
                    self.staffs = data.data.list;
                    self.userID = self.staffs[0].id;
                });
            },
            //初始化查询左侧统计数据
            doQuery(){
                let self = this;
                findUserStatistics({userID:self.userID}).then((data)=>{
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
                    userID:self.userID,
                    startDate: moment(self.startDate).format("YYYY-MM-DD"),
                    endDate: moment(self.endDate).format("YYYY-MM-DD"),
                    curPage: self.curPage,
                    pageSize: self.pageSize
                };
                doQueryStatistics(self.activeName,param).then((result)=>{
                    let res = result.data;

                    let error_code = res.error_code;
                    if(error_code != 0){
                        self.$message.error(res.msg);
                        return;
                    }
                    let obj = res.data;

                    self.total =  obj.total;
                    if(self.activeName == "betUser"){
                        //进行循环遍历，计算投注、中奖金额
                        let list = obj.list;
                        for(let betObj of list){
                            betObj.amt = betObj.amt/100;
                            betObj.orderaftprizeamt = betObj.orderaftprizeamt/100;
                        }
                        self.betUserStatistics = obj;
                    }else if (self.activeName == "lotno"){
                        let list = obj.list;
                        for(let lotnoObj of list){
                            lotnoObj.amt = lotnoObj.amt/100;
                            lotnoObj.lotnoName = self.getTypeName(lotnoObj.lotno);
                            lotnoObj.time = moment(lotnoObj.time).format("YYYY-MM-DD HH:mm:ss");
                        }
                        self.lotnoStatistics = obj;
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
//            this.doQuery();
//            this.doQueryStatistics();

        },
        created(){
            let self = this;

        }
    };

</script>

<style scoped>
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
    .amount{
        font-size: 16px;
        font-weight:500;
    }

</style>