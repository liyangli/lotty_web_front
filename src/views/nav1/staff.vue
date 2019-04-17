<template>
    <div style="width:100%;">
        <!--内容呈现-->
        <div style="margin-bottom: 10px;float:right">
            <el-button type="primary" @click="addStaff">添加</el-button>
        </div>

        <template>
            <el-table
                    :data="staffs"
                    style="width: 100%">
                <el-table-column
                        prop="username"
                        align="center"
                        label="用户名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="nickname"
                        align="center"
                        label="昵称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="telphone"
                        align="center"
                        label="手机号">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="创建时间">
                    <template slot-scope="scope">{{scope.row.registerDate | formatTime}}</template>
                </el-table-column>
                <el-table-column
                        prop="desc"
                        align="center"
                        label="描述">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editStaff(scope.row)">编辑</el-button>
                        <el-button type="primary" size="mini" @click="delStaff(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <div solt="footer" style="height: 30px;position:absolute ; bottom: 0px;">
            <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="currentChange"
                    :current-page.sync="currentPage"
            ></el-pagination>
        </div>
        <el-dialog
                :title=title
                :visible.sync="dialogVisible"
                 width="30%"
                :before-close="handleClose">
            <el-form :model="staff" :rules="rules" ref="staff" label-width="100px" class="demo-staff">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="staff.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称" >
                    <el-input v-model="staff.nickname"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="telphone">
                    <el-input v-model="staff.telphone"></el-input>
                </el-form-item>
                <el-form-item label="描述" >
                    <el-input v-model="staff.desc"></el-input>
                </el-form-item>
            </el-form>
              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="saveStaff">保 存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
              </span>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import { getStaffList,editStaff,delStaff } from "../../api/api";
    import moment from "moment";
    export default {
        data() {
            return {
                title:"添加员工信息",
                dialogVisible:false,
                currentPage:1,
                pageSize:18,
                total:0,
                staffs: [],
                staff:{
                    username:'',
                    nickname:'',
                    telphone:'',
                    desc:'',
                    groupid:2,
                    password:"123456"
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    telphone: [
                        { required: true, message: '请输入用户手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确手机号', trigger: 'blur' }
                    ]
                }
            };
        },
        filters:{
            formatTime:function (time){
                return moment(time).format("YYYY-MM-DD HH:mm:ss");
            }
        },
        methods: {
            handleClose:function () {
                let self = this;
                self.dialogVisible = false;
                self.staff = {
                    username:'',
                    nickname:'',
                    telphone:'',
                    desc:'',
                    groupid:2,
                    password:"123456"
                }
            },
            editStaff:function (item) {
                let self = this;
                self.title = "编辑员工信息";
                self.staff = item;
                self.dialogVisible = true;
            },
            delStaff:function (item) {
                let self = this;
                self.$confirm('确定删除该员工信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //执行具体的删除动作
                    delStaff({id:item.id}).then(data => {
                        let error_code = data.error_code;
                        if(error_code == 1){
                            self.$message.error(data.msg);
                            return;
                        }
                        self.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        self.doQuery();
                    });

                });
            },
            addStaff:function () {
                let self = this;
                self.title = "添加员工信息";
                self.dialogVisible = true;
            },
            saveStaff:function () {
                let self = this;
                console.info(self.staff)
                editStaff(self.staff).then(data => {
                    let error_code = data.error_code;
                    if(error_code == 1){
                        self.$message.error(data.msg);
                        return;
                    }
                    self.dialogVisible = false;
                    self.$message.info("保存成功");
                    self.doQuery();
                });

            },
            doQuery: function() {
                let self = this;
                var params = {
                    pageNo: self.currentPage,
                    pageSize: self.pageSize
                };
                getStaffList(params).then(data => {
                    let { msg, error_code } = data;
                    if (error_code == 1) {
                        this.$message({
                            message: msg,
                            type: "error"
                        });
                        return;
                    }
                    let content = data.data;
                    self.total = content.total;
                    self.staffs = content.list;
                });
            },
            currentChange() {
                //获取下一页数据
                this.doQuery();
            }
        },
        mounted() {
            this.doQuery();
        }
    };
</script>
