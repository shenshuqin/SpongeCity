import VueRouter from 'vue-router'

// 导入 组件
import HomeContainer from './components/Home/HomeContainer.vue'
import Login from './components/Login/Login.vue'
import Rainflow from './components/Module/Raillflow.vue'
import Waterlevel from './components/Module/waterlevel.vue'
import Waterflow from './components/Module/waterflow.vue'
import Totleflow from './components/Module/totleflow.vue'
import Rainutl from './components/Module/rainutl.vue'

//  创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {path:'/login' , component:Login},
    {path:'/home' , component:HomeContainer},
    {path:'/rainflow' , component:Rainflow},
    {path:'/waterlevel' , component:Waterlevel},
    {path:'/waterflow' , component:Waterflow},
    {path:'/totleflow' , component:Totleflow},
    {path:'/rainutl' , component:Rainutl},
  ]
})

// 把路由对象暴露出去
export default router