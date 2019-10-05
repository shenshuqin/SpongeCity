<template>
    <div>
        <div class="navs">
            <div class="container-fluid">
                <div class="row">
                    <div class="navs-left col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <a class="navbar-brand" href="#">
                            <img class="logo" alt="Brand" src="../../public/images/logo.png">
                        </a>
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
            <el-aside width="200px">
                <div class="aside_box">
                    <span class="iconfont aside">&#xe656;</span>
                    <p>项目总览</p>
                </div>
                <div class="aside_box">
                    <span class="iconfont aside">&#xe605;</span>
                    <p>设备统计</p>
                </div>
                <div class="aside_box">
                    <span class="iconfont aside">&#xe61c;</span>
                    <p>传感器统计</p>
                </div>
                <div class="aside_box">
                    <span class="iconfont aside">&#xe628;</span>
                    <p>时间统计</p>
                </div>
            </el-aside>
            <el-main>
                <el-card class="box-card">
                    <div> <span class="iconfont fonts">&#xe651;</span></div>
                    <div class="card_title1">传感器总数</div>
                    <div class="card_title2"><span>0</span>个</div>
                    <div>今日新增0个</div>
                </el-card>
                <el-card class="box-card">
                    <div> <span class="iconfont fonts">&#xe651;</span></div>
                    <div class="card_title1">传感器总数</div>
                    <div class="card_title2"><span>0</span>个</div>
                    <div>今日新增0个</div>
                </el-card>
                <el-card class="box-card">
                    <div> <span class="iconfont fonts">&#xe651;</span></div>
                    <div class="card_title1">传感器总数</div>
                    <div class="card_title2"><span>0</span>个</div>
                    <div>今日新增0个</div>
                </el-card>
                <el-card class="box-card">
                    <div> <span class="iconfont fonts">&#xe651;</span></div>
                    <div class="card_title1">传感器总数</div>
                    <div class="card_title2"><span>0</span>个</div>
                    <div>今日新增0个</div>
                </el-card>
                <el-card class="box-card">
                    <div> <span class="iconfont fonts">&#xe651;</span></div>
                    <div class="card_title1">传感器总数</div>
                    <div class="card_title2"><span>0</span>个</div>
                    <div>今日新增0个</div>
                </el-card>
                <el-card class="box-card">
                    <div> <span class="iconfont fonts">&#xe651;</span></div>
                    <div class="card_title1">传感器总数</div>
                    <div class="card_title2"><span>0</span>个</div>
                    <div>今日新增0个</div>
                </el-card>
                <el-card class="box-card">
                    <div> <span class="iconfont fonts">&#xe651;</span></div>
                    <div class="card_title1">传感器总数</div>
                    <div class="card_title2"><span>0</span>个</div>
                    <div>今日新增0个</div>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import {getCookie} from '../../public/js/cookie.js';
    import axios from 'axios';
    export  default {
        data(){
            return{
                my_header: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + getCookie('token')
                },
                msg:getCookie("username"),

            }
        },
        mounted(){
        },
        //作用域1
        methods:{
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

                });
            },
        }
    }
    </script>
<style scoped>
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        /*line-height: 200px;*/
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        /*justify-content: space-around;*/
        /*line-height: 160px;*/
    }
    .text {
        font-size: 14px;
    }

    .box-card {
        width: 18%;
        /*float:left;*/
        margin-left: 10px;
        margin-bottom: 10px;
    }
    .box-card div{
        margin-bottom: 10px;
    }
    .fonts{
        font-size:30px;
        color: #59e7c6;
    }
    .card_title1{
        color: #428bca
    }
    .card_title2{
        color: #428bca
    }
    .card_title2 span{
        font-size: 18px;
        font-weight: bolder;
    }
    .aside{
        font-size: 28px;
    }
    .aside_box{
        margin-bottom: 20px;
        margin-top: 30px;
        /*border:1px solid red;*/
    }
    .aside_box p {
        margin: -8px 0 0px;
    }
</style>

