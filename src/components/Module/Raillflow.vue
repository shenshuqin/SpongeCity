<template>
    <div class="raillflow">
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
                    <p class="raillflow-title">雨量蒸发量监测</p>
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
                timer1: '',
                timer2: '',
                series_ldata: [],
                series_jdata: [],
                xAxix_data: [],
                my_header: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + getCookie('token')
                }

            }

        },
        mounted() {
            this.drawLine();
            this.get_address();
            this.getdata_flow();
            this.getdata_rain();
            // this.timer1 = setInterval(this.getdata_flow, 3000);
            // this.timer2 = setInterval(this.getdata_rain, 3000);
        },
        methods: {
            get_address(this_ = this) {
                var address_list = $(".select_address");
                address_list.change(function () {
                    let addr_obj = $(this).attr('id');
                    let addr_rank = 0;
                    // console.log(addr_obj);
                    switch (addr_obj) {
                        case 'sel1':
                            addr_rank = 1;
                            window.addr_id1 = $('#sel1 option:selected').attr('id');
                            break;
                        case 'sel2':
                            addr_rank = 2;
                            window.addr_id2 = $('#sel2 option:selected').attr('id');
                            break;
                        case 'sel3':
                            addr_rank = 3;
                            window.addr_id3 = $('#sel3 option:selected').attr('id');
                            break;
                    }
                    // console.log(addr_obj)
                    // console.log(addr_id1);
                    this_.request_get(addr_rank, "");
                    if (addr_rank === 1) {
                        this_.request_get(addr_rank, "");
                    } else if (addr_rank === 2) {
                        this_.request_get(addr_rank, addr_id1);
                    } else {
                        this_.request_get(addr_rank, addr_id2);
                    }

                });


            },
            request_get(addr_rank, addr_id) {
                axios({
                    // url: ' http://localhost:3001/rail',
                    url: 'http://47.106.83.135:80/sponge/data/sensor',
                    method: 'get',
                    type: 'json',
                    headers: this.my_header

                }).then(function (res) {
                    // console.log(res)
                });
            },
            send_data() {
                var interval = $("#sel0").find("option:selected").text();
                var time_val = parseInt(interval) * 3600;
                var time_start = $("#time_start").val();
                var time_end = $("#time_end").val();
                var address1 = $("#sel1 option:selected").text();
                var address2 = $("#sel2 option:selected").text();
                var address3 = $("#sel3 option:selected").text();
                // var url=' http://47.106.83.135:80/sponge/data/sensor?Interval='+interval+'&Address='+address1/address2/address3+'&start='+time_start+'&end='+time_end;
                var url=`http://47.106.83.135:80/sponge/data/sensor?Interval=${interval}&Address=${address1}/${address2}/${address3}&start=${time_start}&end=${time_end}`;
                axios({
                    url: 'http://47.106.83.135:80/sponge/data/sensor',
                    method: 'get',
                    type: 'json',
                    headers: this.my_header
                }).then(function (res) {
                    // console.log(interval)
                })
            },
            drawLine(this_ = this) {
                let myChart = echarts.init(document.getElementById('chart_example'));
                let option = {
                    // noDataLoadingOption: {
                    //     text: '暂无数据',
                    //     effect: 'bubble',
                    //     effectOption: {
                    //         effect: {
                    //             n: 0
                    //         }
                    //     }
                    // },
                    title : {
                        text: '蒸发量和降水量',
                        subtext: '湖南文理学院'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['蒸发量','降水量']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data: this_.xAxix_data,
                            }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'蒸发量',
                            data: this_.series_ldata,
                            type:'bar',
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'降水量',
                            type:'bar',
                            data: this_.series_jdata,
                             markPoint : {
                                data : [
                                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                };

                myChart.setOption(option);

                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize', function () {
                    myChart.resize()
                });
            },
            getdata_flow(this_ = this) {
                axios({
                    // url: 'http://47.106.83.135:80/sponge/avg_data/sensor?sensor_id=9',
                    url: 'http://47.106.83.135:80/sponge/avg_data/sensor?sensor_id=9',
                    method: 'get',
                    type: 'json',
                    headers: this_.my_header
                }).then(function (res) {
                    console.log(res);
                    var data = res.data.data;
                    var len = data.length;
                    var timearr = [];
                    var flowarr = [];
                    // this_.xAxix_data =data[i].datetime;
                    for (var i = 0; i < len; i++) {
                        timearr.push(data[i].datetime);
                        flowarr.push(data[i].value);
                        // console.log(data[i].datetime)
                    }
                    if (len !== 0) {
                        // 初始化图表
                        this_.drawLine()
                    } else {
                        // 以下是暂无数据显示样式(样式根据本身需求进行调整)
                        var html = '<div><sapn style="font-size: 18px;font-weight: bold;">图表数据</sapn><span  style="position: absolute;top: 40%;margin-left: 10%;color:#868686; font-size: 20px;">暂无数据</span></div>'
                        document.getElementById('chart_example').innerHTML = html
                        document.getElementById('chart_example').removeAttribute('_echarts_instance_')
                    }
                    // console.log(flowarr);
                    this_.xAxix_data = timearr;
                    this_.series_ldata = flowarr;
                    // this_.drawLine();
                })
            },
            getdata_rain(this_ = this) {
                axios({
                    // url: 'http://47.106.83.135:80/sponge/avg_data/sensor?sensor_id=8',
                    url: 'http://47.106.83.135:80/sponge/avg_data/sensor?sensor_id=8',
                    method: 'get',
                    type: 'json',
                    headers: this_.my_header
                }).then(function (res) {
                    console.log(res);
                    var data = res.data.data;
                    var len = data.length;
                    var timearr = [];
                    var rainarr = [];
                    // this_.xAxix_data =data[i].datetime;
                    for (var i = 0; i < len; i++) {
                        timearr.push(data[i].datetime);
                        rainarr.push(data[i].value);
                    }
                    this_.xAxix_data = timearr;
                    this_.series_jdata = rainarr;
                    if (len !== 0) {
                        // 初始化图表
                        this_.drawLine()
                    } else {
                        // 以下是暂无数据显示样式(样式根据本身需求进行调整)
                        var html = '<div><sapn style="font-size: 18px;font-weight: bold;">图表数据</sapn><span  style="position: absolute;top: 40%;margin-left: 10%;color:#868686; font-size: 20px;">暂无数据</span></div>'
                        document.getElementById('chart_example').innerHTML = html
                        document.getElementById('chart_example').removeAttribute('_echarts_instance_')
                    }
                })
            },
        },

        watch: {},
        created() {

        },
        beforeDestroy() {
            clearInterval(this.timer1);
            clearInterval(this.timer2);
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
