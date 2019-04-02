<template>
    <div>
        <!--第一层类型分类-->
        <div class="type_level">
            <div class="lotty_type " @click.prevent="opearAllClick()">
                <label :class="first_type_checked?'is_checked':''" style="float:left;margin-right:5px;cursor: pointer" >
                    <input type="checkbox" class="el-checkbox-button__original">
                    <span >全部</span>
                </label>
            </div>



            <div class="lotty_type " @click.prevent="opearClick(type)" v-for="type in types">
                <label :class="type.checked?'is_checked':''" style="float:left;margin-right:5px;cursor: pointer" >
                    <input type="checkbox" v-model="type.checked"  class="el-checkbox-button__original">
                    <span >{{type.name}}</span>
                </label>
            </div>

        </div>
        <!--第二层分类-->
        <div class="type_level">
            <div class="lotty_type " @click.prevent="opearSecondAllClick()">
                <label :class="second_type_checked?'is_checked':''" style="float:left;margin-right:5px;cursor: pointer" >
                    <input type="checkbox" class="el-checkbox-button__original">
                    <span >全部</span>
                </label>
            </div>

            <div class="lotty_type " @click.prevent="opearSecondClick(type)" v-for="type in secondTypes">
                <label :class="type.checked?'is_checked':''" style="float:left;margin-right:5px;cursor: pointer" >
                    <input type="checkbox" v-model="type.checked"  class="el-checkbox-button__original">
                    <span >{{type.name}}</span>
                </label>
            </div>
        </div>
        <div v-if="type==1">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="buyuserno"
                        label="操作"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="截止时间/等待时间/金额/注数"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="彩种类型">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        label="订单编号">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                        <i class="el-icon-search" style="color:deepskyblue" @click="orderDetail"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="type==2">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="buyuserno"
                        label="操作"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="投注金额"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="中奖金额">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="出票时间">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="彩种">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        label="订单编号">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                        <i class="el-icon-search" style="color:deepskyblue" @click="orderDetail"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div v-if="type==3" >
            <el-table
                    :data=tableData
                    style="width: 100%">
                <el-table-column
                        prop="buyuserno"
                        label="撤单类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="撤单时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="投注时间">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="金额/注数">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="彩种">
                </el-table-column>
                <el-table-column
                        prop="buyuserno"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        label="订单编号">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                        <i class="el-icon-search" style="color:deepskyblue" @click="orderDetail"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync=currentPage
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total=total>
            </el-pagination>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { findOrders } from '../../api/api';
    export default {
        props: ['type'],
        data(){
            return {
                types: [],
                secondTypes: [],
                first_type_checked: true,
                second_type_checked: true,
                tableData: [],
                total:0,
                currentPage:1,
                pageSize: 20,
                pageNo: 1
            }
        },
        watch: {
            second_type_checked:function () {
                console.info("second_type_checked change")
            },
            first_type_checked:function () {
                console.info("first_type_checked changed")
            }
        },
        methods:{
            opearAllClick(){
                this.first_type_checked = !this.first_type_checked;
                for(let type of this.types){
                    type.checked=this.first_type_checked;
                }
                if(!this.first_type_checked){
                    this.types[0].checked = true;
                }
                //调用查询方法
                //this.doQuery();
            },
            opearClick(type){
                this.first_type_checked = false;
                type.checked = !type.checked;
                let types = type.subTypes;
                if(type.checked){
                    for(let subType of types){
                        subType.checked = true;
                        this.secondTypes.push(subType);
                    }
                }else{
                    //进行移除secondTypes中对应数据
                    let len = this.secondTypes.length;
                    console.info("len:"+len);
                    for(let i=len-1;i>=0;i--){
                        for(let subType of types){
                            if(this.secondTypes[i].id == subType.id){
                                subType.checked = false;
                                this.secondTypes.splice(i,1);
                                break;
                            }
                        }

                    }
                }
                //调用查询方法
                //this.doQuery();
            },
            opearSecondAllClick(){
                this.second_type_checked = !this.second_type_checked;
                for(let type of this.secondTypes){
                    type.checked=this.second_type_checked;
                }
                if(!this.second_type_checked){
                    this.secondTypes[0].checked = true;
                }
                //调用查询方法
                //this.doQuery();
            },
            opearSecondClick(type){
                this.second_type_checked = false;
                type.checked = !type.checked;
                //调用查询方法
                //this.doQuery();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            makeTypes(){
                this.types = [{
                    id: 1,
                    name: '竞彩',
                    checked: false,
                    subTypes: [{
                        id: 11,
                        name: '竞彩足球',
                        checked: false
                    },{
                        id: 12,
                        name: '竞彩篮球',
                        checked: false
                    },{
                        id: 13,
                        name: '胜负彩',
                        checked: false
                    }]
                },{
                    id: 2,
                    name:"数字彩",
                    checked: false,
                    subTypes: [{
                        id: 22,
                        name: '任选九',
                        checked: false,
                    },{
                        id: 22,
                        name: '大乐透',
                        checked: false,
                    },{
                        id: 22,
                        name: '双色球',
                        checked: false,
                    },{
                        id: 22,
                        name: '福彩3D',
                        checked: false,
                    },{
                        id: 22,
                        name: '排列3',
                        checked: false,
                    },{
                        id: 22,
                        name: '排列五',
                        checked: false
                    }]
                },{
                    id: 3,
                    name: '高频彩',
                    checked: false,
                    subTypes:[{
                        id: 31,
                        name: '山东11选5',
                        checked: false
                    },{
                        id: 32,
                        name: '广东11选5',
                        checked: false
                    },{
                        id: 33,
                        name: '吉林快三',
                        checked: false
                    }]
                }]
            },
            doQuery(type){
                //查询所有订单数据
                /**
                 * 需要增加一个彩种的查询，暂时不知道彩种的字段，所以先不处理
                 * @type {methods.doQuery}
                 */
                let self = this;
                findOrders({flag: type,pageSize: self.pageSize,pageNo: self.pageNo}).then((result)=>{
                    self.tableData = result.data.list;
                    self.total = result.data.total;
                });
            },
            orderDetail(){
                //跳转到订单详情页
                let self = this;
                let params = {type:self.type}
                self.$router.push({ path: "/orderDetail", params: params })
            }
        },
        mounted(){
            this.makeTypes();
            //根据类型分别获取具体数据；
            console.info("type:"+this.type);
        }
    }
</script>