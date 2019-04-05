
<template>
    <div style="height: 100%;width:100%;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/order' }">普通订单</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card" shadow="never" >
            <div slot="header" class="clearfix">
                <span class="title">订单详情</span>
            </div>
            <div class="text item">
                <span class="orderInfo">用户名：{{detail.buyuserno}}</span>
                <span class="orderInfo">订单编号：{{detail.id}}</span>
                <span class="orderInfo">金额：{{detail.amt}}</span>
                <span class="orderInfo">{{detail.orderstate}}</span>
            </div>
            <div>
                <el-card class="box-card" shadow="never" >
                    <div slot="header" class="clearfix">
                        <span class="title subTitle">{{detail.lotnoName}}</span>
                        <span class="title subTitle">{{detail.teamCnt}}场</span>
                        <span class="title subTitle">{{detail.subDesc?detail.subDesc+"串1":""}}</span>
                    </div>
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="week"
                                label="场次">
                        </el-table-column>
                        <el-table-column
                                prop="enddate"
                                label="截止时间">
                        </el-table-column>
                        <el-table-column
                                label="对阵">
                            <template slot-scope="scope">
                                <span class="subTitle">{{scope.row.team[0]}}</span>
                                <span class="subTitle">VS{{scope.row.peilvs.peilv?'('+scope.row.peilvs.peilv+')':""}}</span>
                                <span class="subTitle">{{scope.row.team[1]}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="投注项">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="danger">让负 1640</el-button>
                                <el-button
                                        size="mini">大 1750</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="result"
                                label="彩果">
                        </el-table-column>
                    </el-table>
                </el-card>
            </div>
        </el-card>
    </div>

</template>
<script type="text/ecmascript-6">
    import moment from 'moment';
    export default {
        props: ['type'],
        data() {
            return {
                detail:null,
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
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
        mounted() {


        },
        created(){
            let self = this;
            let detail = self.$route.params.detail;
            let type = self.$route.params.type;
            let week = {"1":"周一","2":"周二","3":"周三","4":"周四","5":"周五","6":"周六","7":"周日"};
            console.info(detail)
            if(type == 3){
                //撤单类型
                if(detail.orderInfo){
                    let info = detail.orderInfo.split("@")[0]
                    detail.subDesc =  info.substr(info.length -1,info.length)
                }
                detail.teamCnt = detail.jingcaiResults.length;
                let jingcai = JSON.parse(detail.jingcaiResults);
                for(let each of jingcai) {
                    each.team = each.team.split(":");
                    each.week = week[parseInt(each.week)]+each.teamId;
                }

                detail.teamCnt = jingcai.length;
                self.tableData = jingcai;


            }

            self.detail = detail;

        }
    };

</script>

<style>

    .item {
        margin:20px 20px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;
        border-radius: 0px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        margin:15px 0 0 0;
    }
    .title{
        font-weight: 600;
    }
    .subTitle{
        margin-right: 10px;
    }
    .orderInfo{
        margin-right: 100px;
        color:#5e7382;
    }
</style>