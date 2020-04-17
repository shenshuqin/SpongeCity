// import VueRouter from 'vue-router'

// 导入 组件
import HomeContainer from './components/Home/HomeContainer.vue'
import Login from './components/Login/Login.vue'
import Rainflow from './components/Module/Raillflow.vue'
import Air from './components/Module/air.vue'
import Soil from './components/Module/soil.vue'
import Totleflow from './components/Module/totleflow.vue'
import chart from './components/Module/chart.vue'
import PM from './components/Module/PM.vue'
import Admin from './components/Admin/Admin.vue'
import Map from './components/Admin/map.vue'
import Sensor from './components/Admin/sensor.vue'
import SensorData from './components/SensorData/sensordata.vue'
import Detect from './components/Home/Detect.vue'
import About from './components/About/about.vue'
import Test from './components/About/test.vue'

//  创建路由对象
var router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    {path:'/login' , component:Login},
    {path:'/home' , component:HomeContainer},
    {path:'/rainflow' , component:Rainflow},
    {path:'/air' , component:Air},
    {path:'/soil' , component:Soil},
    {path:'/totleflow' , component:Totleflow},
    {path:'/chart' , component:chart},
    {path:'/pm' , component:PM},
    {path:'/admin' , component:Admin},
    {path:'/sensor' , component:Sensor},
    {path:'/map' , component:Map},
    {path:'/sensordata' , component:SensorData},
    {path:'/detect' , component:Detect},
    {path:'/about' , component:About},
    {path:'/test' , component:Test},
  ]
})

// 把路由对象暴露出去
export default router
