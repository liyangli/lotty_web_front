import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/api/login`, params).then(res => res.data); };
export const requestRegister = params => { return axios.post(`${base}/api/register`, params).then(res => res.data); };

export const getUserList = params => { return axios.post(`${base}/api/betUser/search`, params).then(res => res.data); };
export const addBetUser = params => { return axios.post(`${base}/api/betUser/add`, params).then(res => res.data); };

export const findOrders = params => { return axios.post(`${base}/api/order/search`, params).then(res => res.data); };
export const findTypes = params => { return axios.get(`${base}/api/order/findType`,{ params: params }).then(res => res.data); };

export const getUserListPage = params => { return axios.get(`${base}/api/user/listpage`, params); };

export const removeUser = params => { return axios.get(`${base}/api/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/api/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/api/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/api/user/add`, { params: params }); };

//获取注册用户统计数据
export const findUserStatistics = params => { return axios.get(`${base}/api/statistics/findUserTotalDataMutation`, { params: params }); };
export const doQueryStatistics = (type,params) => { return axios.post(`${base}/api/`+type+"/statistics", params); };
//员工管理
export const getStaffList = params => { return axios.post(`${base}/api/staff/search`,  params).then(res => res.data); };
export const editStaff = params => { return axios.post(`${base}/api/staff/edit`, params).then(res => res.data); };
export const delStaff = params => { return axios.post(`${base}/api/staff/del`, params).then(res => res.data); };