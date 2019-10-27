<template>
    <div>
        <div class="navs">
            <div class="container-fluid">
                <div class="row">
                    <div class="navs-left col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <router-link class="navbar-brand" to="/home" >
                            <img class="logo" alt="Brand" src="../../public/images/logo.png">
                        </router-link>
                        <a href="#" class="navbar-brand navbar-link">海绵城市监测系统</a>
                    </div>
                    <div class="navs-right col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <p class="navbar-text navbar-right">
                            <span class="iconfont fonts">&#xe6de;</span>
                            <span style="font-size:15px;padding-left: 10px">{{msg}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
<!--        nav end-->
        <el-container>
            <el-header>
                <p>基站一传感器列表</p>
            </el-header>
            <el-main class="clearfix">
                <div class="section1">
                <router-link class="box-card" v-for="item in data" :key="item.id" :to="{path:'/sensordata',query:{ id:item.sid ,name:item.type}}">
                    <el-card class="" >
                        <div><span class="iconfont fonts">&#xe685;</span></div>
                        <div class="status">{{item.status}}</div>
                        <p>编号{{item.sid}}</p>
                        <p>{{item.sname}}</p>
                        <p>{{item.type}}</p>
                        <p>{{item.location}}</p>
                        <div class="data">{{item.data}}</div>
                        <div class="time_font">{{item.update_time}}</div>
                    </el-card>
                </router-link>

                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import axios from 'axios'
    import echarts from 'echarts'
    import {getCookie} from '../../public/js/cookie.js';
    import {timestampToTime} from '../../public/js/time.js';
    export  default {
        data(){
            return{
                data:[],
                sid:'',
                my_header: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + getCookie('token')
                },
                msg:getCookie("username"),

            }
        },
        mounted(){
            this.getdata();
            // this. getLocalTime(nS)
        },
        //作用域1
        methods:{
            // getLocalTime(nS) {
            //     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            // },
          //作用域1
            getdata(this_ = this){//作用域1
                //作用域2 this undefined
                axios({
                    // url: ' http://localhost:3001/rail',
                    url: 'http://47.106.83.135:80/sponge/sensors/list',
                    method: 'get',
                    type: 'json',
                    headers: this.my_header

                }).then(function (res) {
                    // console.log(res.data.data);
                    var new_data = res.data.data;
                    for(var i=0;i<new_data.length;i++){
                        ////??????
                        // var update_time = new_data[i].update_time;
                        new_data[i].update_time = timestampToTime(new_data[i].update_time)
                    }
                    console.log(new_data);
                    console.log(this_.data);
                    this_.$set(this_, "data", new_data);//将this_.data的索引为0的元素设置成data 原型 Vue.$set(object, key/index, value/object)
                    console.log(this_.data);
                });
            },
        }
    }
    </script>
<style scoped>
    .el-header{
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-family: 黑体;
        /*line-height: 60px;*/
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        /*border:1px solid red;*/
        text-align: center;

        /*line-height: 160px;*/
    }
    .box-card {
        width: 24%;
        float:left;
        text-decoration: none;
        margin-left: 10px;
        margin-bottom: 10px;
        position:relative;
    }
    .fonts{
        font-size: 30px;
        color: #428bca;
    }
    .box-card .status{
        /*content: '';*/
        width:20px;
        height:20px;
        border-radius: 50%;
        background-color: #7bc3a9;
        position:absolute;
        top:6px;
        right:6px;
    }
    .box-card .time_font{
        width:150px;
        height:15px;
        /*border:1px solid red;*/
        position:absolute;
        font-size: 12px;
        text-align: right;
        font-family: "黑体";
        color: #8d8d8d;
        bottom:6px;
        right:6px;
    }
    .box-card .data{
        font-size: 20px;
        color:yellowgreen;
    }
    .section1{
        width:100%;
        /*border:1px solid red;*/
        display: flex;
        flex-flow: wrap;
        flex-direction: row;
        /*justify-content: center;*/
        /*align-items: center;*/
        height:auto;
    }

</style>

