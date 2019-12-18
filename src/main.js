// import Vue from 'vue'
// const Vue = require('vue');
// 1. 导入 vue-router 包
// import VueRouter from 'vue-router'
// const VueRouter = require('vue-router');
// 2. 手动安装 VueRouter
// Vue.use(VueRouter);
// 导入vue-resource
// import VueResource from 'vue-resource'
// const VueResource = require('vue-resource');
//安装vue-resource
// Vue.use(VueResource);
// 导入bootstrap样式
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: '8zH64Yz09eqZCsRowtehvAFtjm3oUqpr'
});
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import md5 from 'js-md5';
import './public/css/app.css'
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
// import './lib/mui/css/mui.min.css'
import './lib/font/iconfont.css'
import './lib/animate/animate.min.css'
// import './lib/hightchart/highcharts.js'
import './lib/animate/animate.min.css'
//导入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入 app 组件
import app from './App.vue'
import store from './store'
// 导入 自定义路由模块
import router from './router.js'
Vue.prototype.$md5 = md5;
var vm = new Vue({
    el: '#app',
    $,
    render: c => c(app), // render 会把 el 指定的容器中，所有的内容都清空覆盖，所以 不要 把 路由的 router-view 和 router-link 直接写到 el 所控制的元素中
    router, // 4. 将路由对象挂载到 vm 上
    store,
})
