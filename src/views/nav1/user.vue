<template>
	<div style="position:absolute;bottom: 10px;width:100%;top:50px;">
		<!--内容呈现-->
		<div style="height:100%;">
			<el-card class="box-card" style="height:100%;width:25%;float:left;">
				<div slot="header" class="clearfix" >
					<el-input style="width:85%;padding: 0px 0" v-model="input" v-style="" placeholder="请输入用户名或账号" ></el-input>
					<el-button type="primary" icon="el-icon-plus" style="float: right;padding:10px 10px;" >添加</el-button>
				</div>
				<!--用户展示区域-->
				<div  class="textItem">
					<div style="float: left;">
						<div style="width: 36px; height: 36px; float:left; border-radius: 50%; border: 3px solid #eee; overflow: hidden;">
							<img src="https://avatar.csdn.net/2/0/B/3_boonyaxnn.jpg" width="40" height="40" />
						</div>

						<div style="float:right;padding-left: 7px;">
							<div>名称</div>
							<div>15120050982</div>
						</div>
					</div>
					<div style="float:right;padding-right: 10px;">
						<div>2019-01-34 12:12:45</div>
						<div>余额:24.5</div>
					</div>
				</div>
				<div  class="textItem_1 textItem_select">
				<div style="float: left;">
					<div style="width: 36px; height: 36px; float:left; border-radius: 50%; border: 3px solid #eee; overflow: hidden;">
						<img src="https://avatar.csdn.net/2/0/B/3_boonyaxnn.jpg" width="40" height="40" />
					</div>

					<div style="float:right;padding-left: 7px;">
						<div>名称</div>
						<div>15120050982</div>
					</div>
				</div>
				<div style="float:right;padding-right: 10px;">
					<div>2019-01-34 12:12:45</div>
					<div>余额:24.5</div>
				</div>
			</div>
				<div  class="textItem">
					<div style="float: left;">
						<div style="width: 36px; height: 36px; float:left; border-radius: 50%; border: 3px solid #eee; overflow: hidden;">
							<img src="https://avatar.csdn.net/2/0/B/3_boonyaxnn.jpg" width="40" height="40" />
						</div>

						<div style="float:right;padding-left: 7px;">
							<div>名称</div>
							<div>15120050982</div>
						</div>
					</div>
					<div style="float:right;padding-right: 10px;">
						<div>2019-01-34 12:12:45</div>
						<div>余额:24.5</div>
					</div>
				</div>
				<div v-for="user in users" :key="user" class="text item">

				</div>
			</el-card>
			<div style="width:74%;height: 100%;float: right;">
				<!--用户信息-->
				<div style="width: 79%;height: 100px;border: 1px solid rgb(209, 219, 229);text-align: center;padding-left: 30px;padding-top: 30px;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);">
					<div style="float: left;width: 150px;height:100px;">
						<div style="width: 60px; height: 60px; float:left; border-radius: 50%; border: 3px solid #eee; overflow: hidden;">
							<img src="https://avatar.csdn.net/2/0/B/3_boonyaxnn.jpg" width="60" height="60" />
						</div>
						<div style="float:right;width: 80px;">
							<div>海上</div>
							<div style="border-radius: 5px;background-color: #20a0ff;color: #FFFFFF;font-weight: bold;margin-top: 15px;">已认证</div>
						</div>
					</div>
					<div style="float: right;width:210px;">
						<div style="float: left;margin-top: 11px;">发布跟单</div>
						<el-switch
								v-model="publishOrder"
								active-color="#13ce66"
								inactive-color="#ff4949">
						</el-switch>
						<el-button type="primary" round>设置备注</el-button>
					</div>
				</div>
				<div class="userBasic_2">
					<div  class="userInfo">
						<div>用 户 名：15120050982</div>
						<div>绑定手机：15120050982</div>
						<div>注册时间：2019-03-12 16:54:16</div>
					</div>
					<div class="userMoney">
						<div class="userBalance">
							<div style="height: 75px;
		vertical-align: bottom;
		display: table-cell;
		text-align: center;
		    font-size: 16px;
		width: 10%;">
								余额(元)：
							</div>
							<div style="text-align: center;
    font-size: 25px;
    margin-top: 5px;
    font-weight: BOLD;">
								100.97
							</div>
						</div>
						<div class="userOpera">
							<el-button type="primary" round>转账</el-button>
						</div>
					</div>
				</div>

				<div class="userDesc">
					<div class="userSrc">用户来源：安卓端</div>

					<div class="userBaseInfo"><el-button type="primary" round>查看详情</el-button></div>
					<div class="userTJ">推荐数据可见
						<el-switch
								v-model="publishOrder"
								active-color="#13ce66"
								inactive-color="#ff4949">
						</el-switch></div>
				</div>
			</div>


		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { getUserList } from '../../api/api';
	export default {
		data() {
			return {
				users:[],
				publishOrder: true
			}
		},
		methods: {

		},
		mounted() {
		}
	};

</script>
<style>
	.el-card__header{
		padding: 5px 5px 5px 5px;
	}
	.el-card__body {
		padding: 5px;
	}

</style>

<style scoped>


	.userSrc{
		float: left;
		width: 33%;
		text-align: center;
		height: 50px;
		line-height: 50px;

	}

	.userTJ{
		float: right;
		width: 33%;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	.userBaseInfo{
		width: 33%;
		float: right;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	.userBasic_2,.userDesc{
		height: 150px;
		width: 81%;
		border-radius: 5px;
		border: 1px solid rgb(209, 219, 229);
		box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	}
	.userDesc{
		margin-top: 15px;
		height: 50px;

	}
	.userInfo{
		float:left;
		height:100%;
		width: 49%;
		border-right:1px solid rgb(209, 219, 229);
		box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	}

	.userInfo>div{
		margin-top: 14px;
		margin-left: 29px;
		font-size: 16px;
	}

	.userMoney{
		width:49%;
		float:right;

	}
	.userBalance{
		float: left;
		width:49%;
	}

	.userBalance>div{

	}

	.userOpera{
		float: right;
		width:49%;
		height: 150px;
		line-height: 150px;
		text-align: center;
		font-size: 18px;
	}

	.el-row {
		margin-bottom: 20px;
	&:last-child {
		 margin-bottom: 0;
	 }
	}
	.el-col {
		border-radius: 4px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	.textItem,.textItem_1{
		height: 44px;
		padding-top: 5px;
		margin-bottom: 0px;
		background-color: #ffffff;
	}


	.textItem_1{
		background-color: #e9eef4;
	}

	.textItem_select{
		background-color: #20a0ff;
		border-radius: 5px;
	}

	.textItem:hover,.textItem_1:hover{
		background-color: #20a0ff;
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
		width: 480px;
	}


</style>