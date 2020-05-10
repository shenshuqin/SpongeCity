// import Vue from 'vue';
// import VueRouter from 'vue-router'
Vue.use(VueRouter)
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
//  和 Bootstrap 用法没有差别
import './lib/font/iconfont.css'
//导入animate
// import './lib/animate/animate.min.css'
import animated from 'animate.css' // npm install animate.css --save安装，再引入
Vue.use(animated)
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

