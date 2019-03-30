<template>
	<div style="height: 100%;width:100%;">
		<el-tabs v-model="orderType" type="card" @tab-click="handleClick">
			<el-tab-pane label="未出票" name="1">
				<order-list type="1"></order-list>
			</el-tab-pane>
			<el-tab-pane label="已出票" name="2">
				<order-list type="2"></order-list>

			</el-tab-pane>
			<el-tab-pane label="已撤单" name="3">
				<order-list type="3"></order-list>
			</el-tab-pane>
		</el-tabs>
		<div class="block">
			<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage1"
					:page-size="20"
					layout="total, prev, pager, next"
					:total="5">
			</el-pagination>
		</div>
	</div>

</template>
<script type="text/ecmascript-6">
	import { getUserList } from '../../api/api';
	import orderList from './order_list.vue'
	import moment from 'moment';
	export default {
		data() {
			return {
				orderType: '1',
				type_jc: '',
				types: [],
				secondTypes: [],
				first_type_checked: true,
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
				}],
				currentPage1: 5

			}
		},
		components: {
			orderList
		},
		methods: {

			handleClick(tab, event) {
				console.log(tab, event);
			},
			opearAllClick(){
				this.first_type_checked = !this.first_type_checked;
				for(let type of this.types){
					type.checked=this.first_type_checked;
				}
				if(!this.first_type_checked){
					this.types[0].checked = true;
				}

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
			},

			/**
			 * 初始化默认类型
			 */
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		},
		mounted() {
			this.makeTypes();
			//获取所有的订单数据；
		}
	};

</script>

<style>
	/*类型层级*/
	.type_level{
		width:100%;
		margin-top:10px;

	}
	.lotty_type{
		height:32px;
		background-color: rgba(64,158,255,.1);
		border:1px solid rgba(64,158,255,.2);
		border-radius: 4px;
		display: inline-block;
		line-height: 30px;
		color: #409eff;
		cursor: pointer;
		padding: 11px;
		padding-top: 0px;
		padding-bottom: 0px;
		position:relative;
		margin-left:5px;
	}
	.lotty_type ,.lotty_type>span>{
		cursor: pointer;
	}

	.lotty_type>label:after{
		display: block;
		position: absolute;
		top: -6px;
		bottom: 0;
		right: -7px;
		width: 15px;
		height: 15px;
		line-height: 15px;
		background: #0dc59f;
		border-radius: 20px;
		color: #fff;
		text-align: center;
		font-size: 10px;
		z-index: 10;
		transition: .1s linear;
		-o-transition: .1s linear;
		-ms-transition: .1s linear;
		-moz-transition: .1s linear;
		-webkit-transition: .1s linear;
		cursor: pointer;
		opacity: 1;
	}

	.is_checked:after{
		content: "\2714";
	}

	.el-checkbox-button__original {
		opacity: 0;
		outline: 0;
		position: absolute;
		margin: 0;
		left: -999px;
	}

</style>