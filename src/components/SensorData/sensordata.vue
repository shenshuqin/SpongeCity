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
        <div class="main">
            <div class="title">{{type}}</div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="datetime"
                    label="日期"
                    width="260">
            </el-table-column>
            <el-table-column
                    prop="value"
                    label="数据值">
            </el-table-column>
        </el-table>
            <div class="pag">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {getCookie} from '../../public/js/cookie.js';
    export  default {
        data(){
            return{
                type:'',
                my_header: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + getCookie('token')
                },
                msg:getCookie("username"),
                tableData: [],
            }
        },
        created: function(this_=this) {
            var newsID=this.$route.query.id;
            this_.type= this.$route.query.name;

            // this_.$http.get('http://47.106.83.135:80/sponge/detail_data/sensor?sensor_id='+newsID).then((response) => {
            //     // console.log(response);
            //     console.log(newsID)
            // }).catch(function(error) {
            //     console.log(error);
            // });
            axios({
                // url: 'http://47.106.83.135:80/sponge/avg_data/sensor?sensor_id=8',
                url:`http://47.106.83.135:80/sponge/detail_data/sensor?sensor_id=${newsID}`,
                method: 'get',
                type: 'json',
                headers: this_.my_header
            }).then(function (res) {
                var data = res.data.data;
                var len = data.length;
                var timearr = [];
                var dataarr = [];
                console.log(data)
                // this_.xAxix_data =data[i].datetime;
                for (var i = 0; i < len; i++) {
                    timearr.push(data[i].datetime);
                    dataarr.push(data[i].value);
                }
                this_.tableData = data;


            })
        },
        mounted(){
            // this.getdata()
        },
        //作用域1
        methods:{
            // getdata(this_ = this) {
            //     axios({
            //         // url: 'http://47.106.83.135:80/sponge/avg_data/sensor?sensor_id=8',
            //         url: 'http://47.106.83.135:80/sponge/avg_data/sensor?sensor_id=2',
            //         method: 'get',
            //         type: 'json',
            //         headers: this_.my_header
            //     }).then(function (res) {
            //         console.log(res);
            //         var data = res.data.data;
            //         var len = data.length;
            //         var timearr = [];
            //         var dataarr = [];
            //         console.log(data)
            //         // this_.xAxix_data =data[i].datetime;
            //         for (var i = 0; i < len; i++) {
            //             timearr.push(data[i].datetime);
            //             dataarr.push(data[i].value);
            //         }
            //         this_.tableData = data;
            //
            //     })
            // },
        }
    }
</script>
<style scoped>
        .main{
            margin: 10px auto;
            width:76%;
            height: auto;
        }
    .main .title{
        width:250px;
        font-size: 18px;
        height: 35px;
        line-height: 35px;
        border-radius: 6px;
        background-color: #4b97ff;
        color:#fff;
    }
    .pag{
        margin-top: 10px;
    }
</style>

