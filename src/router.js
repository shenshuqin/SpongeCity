import VueRouter from 'vue-router'

// 导入 组件
import HomeContainer from './components/Home/HomeContainer.vue'
import Login from './components/Login/Login.vue'
import Rainflow from './components/Module/Raillflow.vue'
import Air from './components/Module/air.vue'
import Soil from './components/Module/soil.vue'
import Totleflow from './components/Module/totleflow.vue'
import Wind from './components/Module/wind.vue'
import PM from './components/Module/PM.vue'
import Admin from './components/Admin/Admin.vue'
import Sensor from './components/Admin/sensor.vue'

//  创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {path:'/login' , component:Login},
    {path:'/home' , component:HomeContainer},
    {path:'/rainflow' , component:Rainflow},
    {path:'/air' , component:Air},
    {path:'/soil' , component:Soil},
    {path:'/totleflow' , component:Totleflow},
    {path:'/wind' , component:Wind},
    {path:'/pm' , component:PM},
    {path:'/admin' , component:Admin},
    {path:'/sensor' , component:Sensor},
  ]
})

// 把路由对象暴露出去
export default router
