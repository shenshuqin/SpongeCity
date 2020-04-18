// import VueRouter from 'vue-router'

// 导入 组件
import HomeContainer from './components/Home/HomeContainer.vue'
import Login from './components/Login/Login.vue'
import Admin from './components/Admin/Admin.vue'
import Map from './components/Admin/map.vue'
import Sensor from './components/Admin/sensor.vue'
import SensorData from './components/SensorData/sensordata.vue'
import Detect from './components/Home/Detect.vue'
import About from './components/About/about.vue'

//  创建路由对象
var router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    {path:'/login' , component:Login},
    {path:'/home' , component:HomeContainer},
    {path:'/admin' , component:Admin},
    {path:'/sensor' , component:Sensor},
    {path:'/map' , component:Map},
    {path:'/sensordata' , component:SensorData},
    {path:'/detect' , component:Detect},
    {path:'/about' , component:About},
  ]
})

// 把路由对象暴露出去
export default router
