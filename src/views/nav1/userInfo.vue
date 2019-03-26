<template style="height: 100%;">
	<div style="height:100%;bottom: 10px;width:100%;margin-top: 5px;">
		<!--内容呈现-->
		<div class="userInfo">
			<div style="width:49%;height: 100%;float: left;">
				demo123
			</div>
			<div style="width:49%;height: 100%;float: right;">
				<!--用户信息-->
				234
			</div>


		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { getUserList } from '../../api/api';
	import moment from 'moment';
	export default {
		data() {
			return {
				users:[],
				total:0,
				selectUser: null,

				publishOrder: true
			}
		},
		methods: {
			findUserIcon: function(url){
				return url||"/static/images/user_def.jpeg";
			},
			findUserClass: function(user){
				let className = "textItem";
				if(user.id == this.selectUser.id){
					className += "  textItem_select";
				}
				return className;
			},
			findRegisterDate: function (date) {
				return moment(date).format("YYYY-MM-DD H:mm:ss")
			},
			doSelectUser(user){
				this.selectUser = user;
			},
			doQuery: function(){
				let self = this;
				var params = {pageNo:1,pageSize:20 };
				getUserList(params).then(data => {
					this.logining = false;
					let { msg, error_code} = data;
					if (error_code== 1) {
						this.$message({
							message: msg,
							type: 'error'
						});
						return;
					}
					let content = data.data;
					self.total = content.total;
					self.users = content.list;
					if(self.users.length > 0){
						self.selectUser = self.users[0];
					}

				});
			}
		},
		mounted() {
			/**
			 * 具体操作步骤：
			 * 1、获取所有的用户数据，通过分页方式进行展示；
			 */
			this.doQuery();
		}
	};

</script>


<style scoped>

	.userInfo {
		position: absolute;
		height: 100%;
		width: 100%;
	}
	.userInfo>div{
		width: 49%;
		border-radius: 5px;
		border: 1px solid rgb(209, 219, 229);
		box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	}


</style>