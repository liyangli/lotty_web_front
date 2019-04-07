import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const requestRegister = params => { return axios.post(`${base}/register`, params).then(res => res.data); };

export const getUserList = params => { return axios.post(`${base}/betUser/search`, params).then(res => res.data); };
export const addBetUser = params => { return axios.post(`${base}/betUser/add`, params).then(res => res.data); };

export const findOrders = params => { return axios.post(`${base}/order/search`, params).then(res => res.data); };
export const findTypes = params => { return axios.get(`${base}/order/findType`,{ params: params }).then(res => res.data); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, params); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//获取注册用户统计数据
export const findUserStatistics = params => { return axios.get(`${base}/statistics/findUserTotalDataMutation`, { params: params }); };
export const doQueryStatistics = (type,params) => { return axios.post(`${base}/`+type+"/statistics", params); };