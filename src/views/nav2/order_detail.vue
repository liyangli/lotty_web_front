
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
                <span class="orderInfo" v-if="lotnoType=='JC'">用户名：{{detail.buyuserno}}</span>
                <span class="orderInfo" v-if="lotnoType=='SZC'">备注名：{{detail.buyuserno}}</span>
                <span class="orderInfo">订单编号：{{detail.id}}</span>
                <span class="orderInfo">金额：￥{{detail.amt}}[{{detail.lotmulti}}倍]</span>
                <span class="orderInfo">{{detail.orderstate==1?"未出票":detail.orderstate==2?"已出票":"已撤单"}}</span>
            </div>
            <div>
                <el-card class="box-card" shadow="never" >
                    <div slot="header" class="clearfix">
                        <span class="title subTitle">{{detail.lotnoName}}</span>
                        <span class="title subTitle" v-if="lotnoType=='JC'">{{detail.teamCnt}}场</span>
                        <span class="title subTitle" v-if="lotnoType=='JC'">{{detail.subDesc?detail.subDesc+"串1":""}}</span>
                        <span class="title subTitle" v-if="lotnoType=='SZC'">第{{detail.batchcode}}期</span>
                    </div>
                    <div v-if="lotnoType=='JC'">
                        <el-table
                                :data="tableData"
                                style="width: 100%">
                            <el-table-column
                                    prop="week"
                                    align="center"
                                    width="120"
                                    label="场次">
                            </el-table-column>
                            <el-table-column
                                    prop="enddate"
                                    align="center"
                                    width="120"
                                    label="截止时间">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="对阵">
                                <template slot-scope="scope">
                                    <span class="subTitle">{{scope.row.team[0]}}{{scope.row.letpoint?'('+scope.row.letpoint+')':""}}</span>
                                    <span class="subTitle">VS</span>
                                    <span class="subTitle">{{scope.row.team[1]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center" label="投注项">
                                <template slot-scope="scope">
                                    <!--<el-button-->
                                    <!--size="mini"-->
                                    <!--type="danger">让负 1640</el-button>-->
                                    <el-button size="mini" v-for="peilv in scope.row.peilvs">
                                        {{peilv.type | peilvTypeFilter}}
                                        <span v-if="peilv.peilv">{{peilv.peilv}}</span>
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="result"
                                    width="120"
                                    label="彩果">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-if="lotnoType=='SZC'">
                        <el-table
                                :data="tableData"
                                style="width: 100%">
                            <el-table-column
                                    prop="batchcode"
                                    align="center"
                                    width="180"
                                    label="期号">
                            </el-table-column>
                            <el-table-column
                                    prop="lotno"
                                    align="center"
                                    width="120"
                                    label="玩法">
                            </el-table-column>
                            <el-table-column
                                    prop="betcode"
                                    align="center"
                                    label="投注号码">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="result"
                                    width="120"
                                    label="彩果">
                            </el-table-column>
                        </el-table>
                    </div>

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
                tableData: []
            }
        },
        filters:{
            lotnoType:null,
            peilvTypeFilter:function (peilv){
                let peilvTypes = {
                        "v0":"主负",
                        "v1":"平",
                        "v3":"主胜",
                        "v1 v3":"主胜 平",
                        "v1 v0":"主胜 主负",
                        "v0 v3":"主胜 主负",
                        "v0 v1":"平 主负",
                        "letVs_v0":"让负",
                        "letVs_v1":"让平",
                        "letVs_v3":"让胜",
                        "g":"大",
                        "l":"小"
                        };
              return peilvTypes[peilv]?peilvTypes[peilv]:peilv;
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
            console.info(detail.pid)
            self.lotnoType = detail.pid;
            if(detail.pid == "JC"){
                //jigncai类型
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
            }else if(detail.pid == "GPC"){
                //gaopingcai

            }else if(detail.pid == "SZC"){
                //数字彩
                let data = {
                    lotno:detail.lotno,
                    batchcode:detail.batchcode,
                    betcode:detail.betcode,
                    result:detail.result
                }
                self.tableData = [data]
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