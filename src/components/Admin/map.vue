<template>
<div>
    <div id="navbar-top">
        <nav class="navbar navbar-default navbar-static navbar-fixed-top" role="navigation" data-spy="affix">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">切换菜单</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand homeback" href="#">
                    </a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li >
                            <router-link class="" to="/home">
                                <span >首页</span>
                            </router-link>
                        </li>
                        <li class="dropdown">
                            <router-link class="" to="/about">
                                <span class="dropdown-toggle scrollTo">关于我们</span>
                            </router-link>
                        </li>
                        <li class="dropdown">
                            <router-link class="" to="/detect">
                                <span class="dropdown-toggle scrollTo">监测中心</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link class="" to="/map">
                                <a href="" target="_blank">基地展示</a>
                            </router-link>
                        </li>
                        <li>
                            <router-link class="" to="/admin">
                                <span class="btnclick" role="button" >后台管理</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
<!--    nav end-->

    <el-container>
        <el-aside width="300px">
            <div class="nid_title">
                基站列表
            </div>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item v-for="item in data" :key="item.id" :title="'基站'+item.nid" :name="item.nid">
                    <div>地点:{{item.name}}</div>
                    <div>经纬度:{{item.location}}</div>
                </el-collapse-item>
            </el-collapse>
        </el-aside>
        <el-main>
                <div class="maps">
                    <div class="maps_title">基站位置</div>
                <baidu-map class="map" :center="{lng: 111.677854, lat: 29.054359}" :zoom="17">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <div v-for="(item,index) in coordinates" :key="item.id" >
                    <bm-marker :position="{lng:item.lng, lat:item.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @click="infoWindowOpen(index)">
                        <bm-info-window class="nid" :show="item.info_wind_show" @close="infoWindowClose(index)" @open="infoWindowOpen(index)">
                            基站{{item.nidname}}
                            <p>
                                <a href="#" @click="jump(index)" class="xiangqin">查看详情</a>
                            </p>
                        </bm-info-window>
                    </bm-marker>
                </div>
             </baidu-map>
                </div>
        </el-main>
    </el-container>
    <div class="footer container-fluid">
        <div class="row">
            <div class="col-md-4 footer_box">
                <router-link class="" to="/home"><p>首页</p></router-link>
                <router-link class="" to="/about"><p>关于我们</p></router-link>
            </div>
            <div class="col-md-4 footer_box">
                <router-link class="" to="/detect"><p>监测中心</p></router-link>
                <router-link class="" to="/map"><p>基地展示</p></router-link>
            </div>
            <div class="col-md-4 footer_box">
                <p>联系方式</p>
                <p>电话:18229695956</p>
                <p>邮箱:2934103556@qq.com</p>
                <p>地址:湖南省常德市武陵区湖南文理学院创客空间</p>
            </div>
            <p class="text-center"> Copyright © 2019</p>
        </div>
    </div>
    <!--        footer end-->
</div>
</template>
<script>
    import {getCookie} from '../../public/js/cookie.js';
    import axios from 'axios';
    export default {
        data () {
            return {
                coordinates:[],
                data: [],
            }
        },
        mounted(){
            this.getdata();
        },
        methods: {
            infoWindowClose (index) {
                this.coordinates[index].info_wind_show = false;
                // console.log(this.coordinates[index].info_wind_show);
            },
            infoWindowOpen (index) {
                // console.log(event)
                this.coordinates[index].info_wind_show = true;
                // console.log(this.coordinates[index].info_wind_show);
            },
            //作用域1
            getdata(this_ = this){//作用域1
                //作用域2 this undefined
                axios({
                    // url: ' http://localhost:3001/rail',
                    url: 'http://47.106.83.135:80/sponge/nodes/list',
                    method: 'get',
                    type: 'json',
                    headers: this.my_header

                }).then(function (res) {
                    var new_data = res.data.data;
                    this_.$set(this_, "data", new_data);//将this_.data的索引为0的元素设置成data 原型 Vue.$set(object, key/index, value/object)
                    console.log(this_.data);
                    this_.data.forEach((dt, index)=>{
                        var location = dt.location;
                        var nidname = dt.nid;
                        var lnglat = location.split(',');
                        var coordinate={lng: null, lat:null, info_wind_show:false,nidname:null};
                        [coordinate.lng, coordinate.lat,coordinate.nidname] = [Number(lnglat[0]), Number(lnglat[1]),nidname];
                        this_.coordinates.push(coordinate);
                    });
                });
            },
            jump(index){
                let this_ = this;
                this_.$router.push({
                    path:"/sensor",
                        query:{
                           nidname:this_.coordinates[index].nidname,

                    }

                })
            },

        }
    }
</script>
<style scoped>
    #navbar-top{
        width:100%;
        height:60px;
        /*border:1px solid red;*/
    }
    .maps{
        width:100%;
        /*margin-top: 80px;*/
        /*background-color: #fff;*/
    }
    .maps_title{
        width:100%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color:#222222;
        /*border:1px solid red;*/
        margin-top: -10px;
        margin-bottom: 30px;
    }
    .map {
        width: 80%;
        border-radius: 6px;
        margin: 0px auto;
        height: 400px;
    }
    .el-aside {
        /*background-color: #D3DCE6;*/
        margin-top: 30px;
        margin-left: 20px;
        background-color: #fff;
        color: #333;
        height: auto;
        border: 1px solid #ccc;

    }
    .nid_box{
        width:100%;
        height: 20px;
        line-height: 20px;
        border-bottom: 1px solid #ccc;

    }
    .nid_box p:nth-of-type(1){
        float:left;
        height: 20px;
        line-height: 20px;
    }
    .nid_box p:nth-of-type(2){
        height: 20px;
        line-height: 20px;
        float:right;
    }
    .el-main {
        /*background-color: #E9EEF3;*/
        background-color: #fff;
        color: #333;
    }
    .nid_title{
        width:100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 20px;
        color: #4C4C4C;
    }
    .nid{
        /*position:relative;*/
     }
    .xiangqin{
        text-decoration: none;
        margin-top: 30px;
        font-size: 12px;
        /*margin-top: 30%;*/
        /*position:absolute;*/
        /*right:0;*/
        /*bottom:0;*/
        /*margin-left: 80px;*/
    }
    .el-collapse-item__header{
        padding-left: 15px;
    }
</style>

