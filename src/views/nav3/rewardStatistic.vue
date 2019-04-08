<template>
	<div style="height: 100%;width:100%;">
		<el-row :gutter="20" >
			<el-col :span="6">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span >数据</span>
					</div>

					<div class="tabOne blue">
						<div class="tabTitle">今日派奖</div>
						<div class="circle top"></div>
						<div class="circle bottom"></div>
						<div class="tabContent">
							<span class="contentBox"><span class="content">0</span>单</span>
							<span class="contentBox"><span class="content">0.00</span>元</span>
						</div>
					</div>
					<div class="tabOne orange">
						<div class="tabTitle">本周派奖</div>
						<div class="circle top"></div>
						<div class="circle bottom"></div>
						<div class="tabContent">
							<span class="contentBox"> <span class="content">0</span>单</span>
							<span class="contentBox"> <span class="content">0.00</span>元</span>
						</div>
					</div>
					<div class="tabOne green">
						<div class="tabTitle">本月派奖</div>
						<div class="circle top"></div>
						<div class="circle bottom"></div>
						<div class="tabContent">
							<span class="contentBox"> <span class="content">0</span>单</span>
							<span class="contentBox">  <span class="content">0.00</span>元</span>
						</div>
					</div>


				</el-card>
			</el-col>
			<el-col :span="18">
				<el-card class="box-card" shadow="never" >
					<div slot="header" class="clearfix">
						<span >总订单数 </span><span class="amount">83</span> &nbsp;&nbsp;
						<span>总金额(元) </span><span class="amount">6038.00</span>
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
									label="订单所属用户">
							</el-table-column>
							<el-table-column
									prop="name"
									label="派奖金额">
							</el-table-column>
							<el-table-column
									prop="address"
									label="派奖时间">
							</el-table-column>
						</el-table>
					</template>
					<div class="block">
						<el-pagination
								@current-change="handleCurrentChange"
								:current-page.sync=pageNo
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
	import { findUserStatistics } from '../../api/api';
	export default {
		data() {
			return {
				date:null,
				tableData: [],
				pageSize:20,
				pageNo:1,
				total:0,
			}
		},
		components: {

		},
		methods: {
			handleCurrentChange(val){
				console.log(`当前页: ${val}`);
			},
			//初始化查询左侧统计数据
			doQuery(){
				let self = this;
			}
		},
		mounted() {
			this.doQuery();

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
		width: calc(64% - 20px);
		float: right;
		line-height: 90px;
	}
	.contentBox{
		display: block;
		height: 30px;
	}
	.content{
		font-size: 25px;
	}
	.amount{
		font-size: 16px;
		font-weight:500;
	}

</style>