import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import userInfo from './views/nav1/userInfo.vue'
import user from './views/nav1/user.vue'
import order from './views/nav2/order.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import orderDetail from './views/nav2/order_detail.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/user', component: user, name: '用户管理' },
            { path: '/userInfo', component: userInfo, name: '用户详情',hidden: true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/order', component: order, name: '普通订单' },
            { path: '/orderDetail', component: orderDetail, name: '订单详情',hidden: true  },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据统计',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page6', component: Page6, name: '用户数据' },
            { path: '/page7', component: Page6, name: '出票数据' },
            { path: '/page8', component: Page6, name: '派奖数据' },
            { path: '/page9', component: Page6, name: '取票数据' }
        ]
    },
    
];

export default routes;