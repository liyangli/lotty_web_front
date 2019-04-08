<template>
	<div style="height: 100%;width:100%;">
		<el-tabs v-model="orderType"  @tab-click="handleClick">
			<el-tab-pane label="未出票" name="1" >
				<order-list type="1" ref="orderList1"></order-list>
			</el-tab-pane>
			<el-tab-pane label="已出票" name="2" >
				<order-list type="2" ref="orderList2"></order-list>
			</el-tab-pane>
			<el-tab-pane label="已撤单" name="3" >
				<order-list type="3" ref="orderList3"></order-list>
			</el-tab-pane>
		</el-tabs>
	</div>

</template>
<script type="text/ecmascript-6">
	import { getUserList } from '../../api/api';
	import orderList from './order_list.vue'
	import moment from 'moment';
	export default {
		data() {
			return {
				orderType: "1",
			}
		},
		components: {
			orderList
		},
		methods: {
			handleClick(tab, event) {
				//调用对应子组件查找方法
				for(let each in this.$refs){
					if(each.indexOf(tab.name)!= -1){
						this.$refs[each].doQuery({'type':tab.name});
						break;
					}
				}
			},
		},
		mounted() {

		},
		created(){
			let self = this;

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