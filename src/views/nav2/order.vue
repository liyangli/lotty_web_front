<template>
	<div style="height: 100%;width:100%;">
		<el-tabs v-model="orderType" type="card" @tab-click="handleClick">
			<el-tab-pane label="未出票" name="1">
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
			</el-tab-pane>
			<el-tab-pane label="已出票" name="2">已出票

			</el-tab-pane>
			<el-tab-pane label="已撤单" name="3">

			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script type="text/ecmascript-6">
	import { getUserList } from '../../api/api';
	import moment from 'moment';
	export default {
		data() {
			return {
				orderType: '1',
				type_jc: '',
				types: [],
				secondTypes: [],
				first_type_checked: true
			}
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
			}
		},
		mounted() {
			this.makeTypes();
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