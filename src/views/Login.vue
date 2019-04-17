<template>
  <div>
    <div v-if="type==1">
      <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">彩票管理系统</h3>

        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm1.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm1.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-if="type=1" v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
          <!--<a v-on:click="change(2)" >注册</a>-->
        </el-form-item>
      </el-form>
    </div>
    <div v-if="type==2">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">彩票管理系统</h3>

        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="telphone">
          <el-input type="text" v-model="ruleForm2.telphone" auto-complete="off" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input type="text" v-model="ruleForm2.nickname" auto-complete="off" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:80%;" @click.native.prevent="register">注册</el-button>
          <a v-on:click="change(1)" >登录</a>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import { requestLogin,requestRegister} from '../api/api';
  import RouterUtil from "../routes";
  import Home from './Home.vue'
  import Main from './Main.vue'
  import userInfo from './nav1/userInfo.vue'
  import user from './nav1/user.vue'
  import staff from './nav1/staff.vue'
  import order from './nav2/order.vue'
  import orderDetail from './nav2/order_detail.vue'
  import userStatistic from './nav3/userStatistic.vue'
  import orderStatistic from './nav3/orderStatistic.vue'
  import takeTicket from './nav3/takeTicket.vue'
  import rewardStatistic from './nav3/rewardStatistic.vue'
  import Login from './Login.vue'
  import NotFound from './404.vue'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePhone = (rule, value, callback) => {
                if (!value) {
                  return callback(new Error('手机号不能为空'));
                } else {
                  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                  console.log(reg.test(value));
                  if (reg.test(value)) {
                    callback();
                  } else {
                    return callback(new Error('请输入正确的手机号'));
                  }
        }
      };
      return {
        type: 1,//标识；1：登录；2：注册
        logining: false,
        ruleForm1: {},
        ruleForm2: {},
        rules1: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          telphone: [{validator: validatePhone, trigger: 'blur' }]
        },
        checked: true
      };
    },
    methods: {
      register() {
        //对应进行设置注册动作；
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass,telphone:this.ruleForm2.telphone,nickname:this.ruleForm2.nickname };
            requestRegister(loginParams).then(data => {
              this.logining = false;
              let { msg, error_code} = data;
              if (error_code== 1) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
//                sessionStorage.setItem('user', JSON.stringify(data.data));
                this.$message({
                  message: "注册成功",
                  type: 'info'
                });
                this.type = 1;

              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      change(type){
        this.ruleForm1={};
        this.ruleForm2={};
        this.type = type;
      },

      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm1.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm1.account, password: this.ruleForm1.checkPass };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              let { msg, error_code} = data;
              if (error_code== 1) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(data.data));
                console.info("登录成功。。。。");
                let userObj = data.data;
                let adminFlag = false;
                if(userObj.groupid == 1){
                    adminFlag = true;
                }
                let routes = RouterUtil.findRoutes(adminFlag);
                this.$router.addRoutes(routes);
                this.$router.options.routes= routes;
                //动态追加路由信息，同时判断对应用户类型是什么类型
                this.$router.push({ path: '/user' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>