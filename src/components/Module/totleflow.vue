<template>
    <div class="totelflow">
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
                            <span style="font-size:15px;padding-left: 10px">shenshuqin</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--        nav结束-->
        <p style="width:100%;height: 1px;background-color: #ccc"></p>
        <div class="main container-fluid">

            <div class="row">
                <div class="col-md-6 raill-left">
                    <p class="raillflow-title">臭氧,光照,气压监测</p>
                    <div class="form-group">
                        <p for="sel1" style="font-size: 16px"><span class="iconfont rg">&#xe6af;</span>&nbsp;选择时隔:</p>
                        <select class="form-control" id="sel0">
                            <option>1小时</option>
                            <option>2小时</option>
                            <option>4小时</option>
                            <option>6小时</option>
                        </select>
                        <p for="sel1" style="font-size: 16px"><span class=" rb iconfont">&#xe61f;</span>&nbsp;选择地点:</p>
                        <select class="form-control select_address" id="sel1">
                            <!--                            <option v-for="address in data" :key="index">{{address.address1}}</option>-->
                            <option id="index0">鼎城区</option>
                            <option id="index1">澧县</option>
                            <option id="index2">临澧</option>
                        </select>
                        <select class="form-control select_address" id="sel2">
                            <option id="index3">文理学院西校区</option>
                            <option>烟草厂</option>
                            <option>仙缘小区</option>
                            <option>体育馆</option>
                        </select>
                        <select class="form-control select_address" id="sel3">
                            <option>水景广场</option>
                            <option>白马湖</option>
                            <option>沙滩公园</option>
                            <option>柳叶湖</option>
                        </select>
                    </div>
                    <div class="form-inline times">
                        <p id="time" style="font-size: 16px"><span class=" rr iconfont">&#xe6e4;</span>&nbsp;选择时间段</p>
                        <input class="form-control" id="time_start" type="date" value="2015-09-24"/>
                        <span>至</span>
                        <input class="form-control" id="time_end" type="date" value="2015-09-24"/>

                    </div>
                    <button type="button" @click="send_data" class="btn btn-info sub_btn btn-block">提交</button>
                </div>
                <div class="col-md-6 raill-right">
                    <!--               <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>-->
                    <!--                    <x-chart :id="id" :option="option"></x-chart>-->

                    <div id="chart_example" style="width:560px;height:500px;">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import echarts from 'echarts'
    import {getCookie} from '../../public/js/cookie.js';
    export default {
        data() {
            return {
                dateList1:[],
                dateList2:[],
                dateList3:[],
                valueList1:[],
                valueList2:[],
                valueList3:[]
            }
        },

        mounted() {
            this.getdata1();
            this.getdata2();
            this.getdata3();
        },
        methods: {

            drawLine(this_ = this){
                let myChart = echarts.init(document.getElementById('chart_example'));
                let option = {
                    title: {
                        // text: '堆叠区域图'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['臭氧','光照强度','气压']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data :this_.dateList1
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'臭氧',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:this_.valueList1
                        },
                        {
                            name:'光照强度',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:this_.valueList2
                        },
                        {
                            name:'气压',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:this_.valueList3
                        },
                    ]
                };
                myChart.setOption(option);

                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize',function() {myChart.resize()});
            },

            getdata1(this_ = this){
                axios({
                    url: 'http://47.106.83.135:80/sponge/data/sensor?type=5',
                    method: 'get',
                    type: 'json',
                    headers: this_.my_header
                }).then(function (res) {
                    console.log(res);
                    var data = res.data.data;
                    var len = data.length;
                    var timearr = [];
                    var ozonearr = [];
                    // this_.xAxix_data =data[i].datetime;
                    for (var i = 0; i < len; i++) {
                        timearr.push(data[i].datetime);
                        ozonearr.push(data[i].value);
                        // console.log(data[i].datetime)
                    }
                    // console.log(flowarr);
                    this_.dateList1= timearr;
                    this_.valueList1 = ozonearr;
                    this_.drawLine();
                })
            },
            getdata2(this_ = this){
                axios({
                    url: 'http://47.106.83.135:80/sponge/data/sensor?type=6',
                    method: 'get',
                    type: 'json',
                    headers: this_.my_header
                }).then(function (res) {
                    console.log(res);
                    var data = res.data.data;
                    var len = data.length;
                    var timearr = [];
                    var lightarr = [];
                    // this_.xAxix_data =data[i].datetime;
                    for (var i = 0; i < len; i++) {
                        timearr.push(data[i].datetime);
                        lightarr.push(data[i].value);
                        // console.log(data[i].datetime)
                    }
                    // console.log(flowarr);
                    this_.dateList1= timearr;
                    this_.valueList2 = lightarr;
                    this_.drawLine();
                })
            },
            getdata3(this_ = this){
                axios({
                    url: 'http://47.106.83.135:80/sponge/data/sensor?type=7',
                    method: 'get',
                    type: 'json',
                    headers: this_.my_header
                }).then(function (res) {
                    console.log(res);
                    var data = res.data.data;
                    var len = data.length;
                    var timearr = [];
                    var gasarr = [];
                    // this_.xAxix_data =data[i].datetime;
                    for (var i = 0; i < len; i++) {
                        timearr.push(data[i].datetime);
                        gasarr.push(data[i].value);
                        // console.log(data[i].datetime)
                    }
                    // console.log(flowarr);
                    this_.dateList1= timearr;
                    this_.valueList3 = gasarr;
                    this_.drawLine();
                })
            }

        },
        watch: {},
        created() {
            // this.getdata()
        }
    }
</script>
<style scoped >
    .raillflow{
        background-color: #F8FAFC;
    }
    .main{
        max-width: 980px;
        margin: auto;
        /*height: auto;*/
    }
    .main .raillflow-title{
        text-indent: 9px;
        font-size: 26px;
        color: #353535;
        border-left: 3px solid #238AED;
        /*line-height: 26px;*/
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .raill-left{
        margin-top: 8px;
        /*border:1px solid #ccc;*/
        /*border:1px solid red;*/
    }
    .raill-right{
        /*border:1px solid red;*/
    }
    .form-group{
        width:68%;
    }
    .form-group select{
        border:1px solid #ccc !important;
        margin-bottom: 10px;
        /*-webkit-appearance: !important;*/
    }
    .times input{
        width:32%;
        font-size: 12px;
    }
    .rg{
        color:green
    }
    .rb{
        color:#238AED;
    }
    .rr{
        color:red;
    }
</style>
