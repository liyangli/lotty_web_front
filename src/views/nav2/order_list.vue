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
                        <i class="el-icon-search" style="color:deepskyblue" @click="orderDetail(scope.row)"></i>
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
                        <i class="el-icon-search" style="color:deepskyblue" @click="orderDetail(scope.row)"></i>
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
                        prop="canceltime"
                        label="撤单时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="createtime"
                        label="投注时间">
                </el-table-column>
                <el-table-column
                        prop="amt"
                        label="金额/注数">
                </el-table-column>
                <el-table-column
                        prop="lotnoName"
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
                        <i class="el-icon-search" style="color:deepskyblue" @click="orderDetail(scope.row)"></i>
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
    import {findTypes} from '../../api/api';
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
        methods:{
            opearAllClick(){
                this.first_type_checked = !this.first_type_checked;
                for(let type of this.types){
                    type.checked=this.first_type_checked;
                }
                if(!this.first_type_checked){
                    this.types[0].checked = true;
                }
                this.doQuery();
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
                this.doQuery();
            },
            opearSecondAllClick(){
                this.second_type_checked = !this.second_type_checked;
                for(let type of this.secondTypes){
                    type.checked=this.second_type_checked;
                }
                if(!this.second_type_checked){
                    this.secondTypes[0].checked = true;
                }
                this.doQuery();
            },
            opearSecondClick(type){
                this.second_type_checked = false;
                type.checked = !type.checked;
                this.doQuery();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
                for(let each of self.types){
                    for(let lotno of each.subTypes){
                        if(lotno.id == typeID){
                            return each.name+" "+lotno.name;
                        }
                    }
                }
            },
            doQuery(type){
                //查询订单数据
                let self = this;
                let params = {
                    flag: type,
                    pageSize: self.pageSize,
                    pageNo: self.pageNo
                }
                let lotnoIDs = "";
                for(let each of self.types){
                    if(each.checked){
                        for(let lotno of each.subTypes){
                            if(lotno.checked){
                                lotnoIDs += lotno.id+",";
                            }
                        }
                    }
                }
                if(lotnoIDs != ""){
                    params.lotno = lotnoIDs.substr(0,lotnoIDs.length - 2);
                }

                findOrders(params).then((result)=>{
                    let list = result.data.list;
                    for(let each of list){
                        each.lotnoName = this.getTypeName(each.lotno);
                    }
                    self.tableData = list;
                    self.total = result.data.total;
                });
            },
            orderDetail(orderInfo){
                //跳转到订单详情页
                let self = this;
                let params = {type:self.type,detail:orderInfo}
//                self.$router.push({ path: "/orderDetail", params: params })
                self.$router.push({ name: "订单详情", params: params })
            }
        },
        mounted(){
            this.findTypes();
            //根据类型分别获取具体数据；
            console.info("type:"+this.type);
        }
    }
</script>