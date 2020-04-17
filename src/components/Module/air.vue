<template>
    <div class="waterlevel">
        <div class="main container-fluid " :style="{minHeight:minHeight+'px'}">

            <div class="row">
                <div class="col-md-6 raill-left">
                    <p class="raillflow-title">空气温湿度监测</p>
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
                    <button type="button" @click="" class="btn btn-info sub_btn btn-block">提交</button>
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
                minHeight:'',
                timer1:'',
                time2:'',
                dateList1:[],
                dateList2:[],
                valueList1:[],
                valueList2:[]
                 }
        },
        created(){
            this.$emit('header', true);
            this.$emit('footer', true);
        },
        mounted() {
            // this.drawLine();
            this.getdata_temp();
            this.getdata_hum();
            // this.timer1 = setInterval(this.getdata_temp, 3000);
            // this.timer1 = setInterval(this.getdata_hum, 3000);
            this.minHeight = document.documentElement.clientHeight - 230;
            var this_ = this;
            window.onresize = function () {
                this_.minHeight = document.documentElement.clientHeight - 230
            }
        },
        methods: {
            drawLine(this_=this){
                let myChart = echarts.init(document.getElementById('chart_example'));
                // var colors = ['#5793f3', '#d14a61', '#675bba'];
                // let myChart = echarts.init(document.getElementById('chart_example'),'light');
                let option = {
                    title: {
                        text: '空气温湿度监测',
                        subtext: '湖南文理学院'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['空气温度','空气湿度']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        // data: ['周一','周二','周三','周四','周五','周六','周日']
                        data:this_.dateList1,
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [
                        {
                            name:'空气温度',
                            type:'line',
                            // data:[11, 11, 15, 13, 12, 13, 10],
                            data: this_.valueList1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'空气湿度',
                            type:'line',
                            // data:[1, -2, 2, 5, 3, 2, 0],
                            data: this_.valueList2,
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        }
                    ]
                };
                myChart.setOption(option);

                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize',function() {myChart.resize()});

            },
            getdata_temp(this_ = this) {
                axios({
                    // url: 'http://121.199.42.23:8080/sponge/data/sensor?sensor_id=1',
                    url: 'http://121.199.42.23:8080/sponge/avg_data/sensor?sensor_id=1',
                    method: 'get',
                    type: 'json',
                    headers: this_.my_header
                }).then(function (res) {
                    // console.log(res);
                    var data = res.data.data;
                    var len = data.length;
                    var timearr = [];
                    var airtemparr = [];
                    // this_.xAxix_data =data[i].datetime;
                    for (var i = 0; i < len; i++) {
                         timearr.push(data[i].datetime);
                         airtemparr.push(data[i].value);
                        // console.log(data[i].datetime)
                    }
                    console.log(airtemparr);
                    this_.dateList1= timearr;
                    this_.valueList1 = airtemparr;
                    // this_.drawLine();
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
            getdata_hum(this_ = this) {
                axios({
                    // url: 'http://121.199.42.23:8080/sponge/data/sensor?sensor_id=2',
                    url: 'http://121.199.42.23:8080/sponge/avg_data/sensor?sensor_id=2',
                    method: 'get',
                    type: 'json',
                    headers: this_.my_header
                }).then(function (res) {
                    // console.log(res);
                    var data = res.data.data;
                    var len = data.length;
                    var timearr = [];
                    var airhumarr = [];
                    // this_.xAxix_data =data[i].datetime;
                    for (var i = 0; i < len; i++) {
                        timearr.push(data[i].datetime);
                        airhumarr.push(data[i].value);
                        // console.log(data[i].datetime)
                    }
                    console.log(this_.valueList2);
                    this_.dateList2= timearr;
                    this_.valueList2 = airhumarr;
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
        beforeDestroy() {
            clearInterval(this.timer1);
            clearInterval(this.timer2);
        }
    }
</script>
<style scoped >
    /*#navbar-top{*/
    /*    margin-bottom: 80px;*/
    /*}*/
    .raillflow{
        background-color: #F8FAFC;
    }
    .main{
        max-width: 980px;
        margin: auto;
        margin-top:8%;
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
