import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import RouterUtil from './routes'
import 'font-awesome/css/font-awesome.min.css'
import user from './views/nav1/user.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import userInfo from './views/nav1/userInfo.vue'
import staff from './views/nav1/staff.vue'
import order from './views/nav2/order.vue'
import orderDetail from './views/nav2/order_detail.vue'
import userStatistic from './views/nav3/userStatistic.vue'
import orderStatistic from './views/nav3/orderStatistic.vue'
import takeTicket from './views/nav3/takeTicket.vue'
import rewardStatistic from './views/nav3/rewardStatistic.vue'


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

//设置由后台进行返回具体的数据。是否可以进行变化？？

let userObj = sessionStorage.getItem('user');
let adminFlag = false;
if(userObj && JSON.parse(userObj).groupid == 1){
  adminFlag = true;
}
console.info("adminFlag:"+adminFlag);
let routersObj =  RouterUtil.findRoutes(adminFlag);
console.info(routersObj);
const router = new VueRouter({
  routes: routersObj
});
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' });
    return;
  }
  next()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

