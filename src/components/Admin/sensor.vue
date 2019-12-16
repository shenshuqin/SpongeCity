<template>
    <div>
        <el-container :style="{minHeight:minHeight+'px'}">
            <el-header>
                <p>基站一传感器列表</p>
            </el-header>
            <el-main class="clearfix">
                <div class="section1" id="chart">
                <router-link class="box-card" v-for="item in data" :key="item.id" :to="{path:'/sensordata',query:{ id:item.sid ,name:item.type}}">
                    <el-card class="" >
                        <div><span class="iconfont fonts">&#xe685;</span></div>
                        <div class="status">{{item.status}}</div>
                        <p>编号{{item.sid}}</p>
                        <p>{{item.sname}}</p>
                        <p>{{item.type}}</p>
<!--                        <p>{{item.location}}</p>-->
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
        data() {
            return {
                data: [],
                sid: '',
                minHeight: '',
                timer: '',
                sensorID: null,
                my_header: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + getCookie('token')
                },
                msg: getCookie("username"),

            }
        },
        created: function (this_ = this) {
            this.$emit('header', true);
            this.$emit('footer', true);
            this.sensorID = this.$route.query.nid;
        },
        mounted() {
            this.getdata();
            this.timer = setInterval(this.getdata, 10000);
            this.minHeight = document.documentElement.clientHeight - 230;
            var this_ = this;
            window.onresize = function () {
                this_.minHeight = document.documentElement.clientHeight - 230
            }
        },
        //作用域1
        methods: {
            //作用域1
            getdata(this_ = this) {//作用域1
                //作用域2 this undefined
                axios({
                    url: `http://47.106.83.135:8000/sponge/sensors/list?nid=${this.sensorID}`,
                    method: 'get',
                    type: 'json',
                    headers: this.my_header

                }).then(function (res) {
                    var new_data = res.data.data;
                    console.log(new_data);
                    if(new_data.length == 0){
                        console.log("暂无数据")
                        var html = '<div><sapn style="font-size: 18px;font-weight: bold;">基站传感器数据</sapn><span  style="position: absolute;top: 40%;margin-left: 10%;color:#868686; font-size: 20px;">暂无数据</span></div>'
                        document.getElementById('chart').innerHTML = html
                        document.getElementById('chart').removeAttribute('_echarts_instance_')
                    }else{
                        console.log("有数据")
                        for (var i = 0; i < new_data.length; i++) {
                         new_data[i].update_time = timestampToTime(new_data[i].update_time)
                        }
                       this_.$set(this_, "data", new_data);//将this_.data的索引为0的元素设置成data 原型 Vue.$set(object, key/index, value/object)
                    }
                   
                });
            },
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
    }
    </script>
<style scoped>
    .el-container{
        margin-top:50px;
        /*height: 500px;*/
    }
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
        font-size: 28px;
        color:#5FB878;
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

