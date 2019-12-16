<template>
    <div class="rainutl">
        <div class="main container-fluid"  :style="{minHeight:minHeight+'px'}">

            <div class="row">
                <div class="col-md-6 raill-left">
                    <p class="raillflow-title">监测</p>
                    <div class="form-group">
                          <p for="sel1" style="font-size: 16px"><span class="iconfont rg">&#xe60b;</span>&nbsp;选择传感器类型:</p>
                        <select class="form-control" id="sel0" v-model="sensorObj.sensorsSelected" @change="chooseValue">
                            <option v-for="(item,index) in sensorObj.sensorList" :key="index" :value="item.id">{{item.type}}</option>
                        </select>
                        <p for="sel1" style="font-size: 16px"><span class="iconfont rg">&#xe6af;</span>&nbsp;选择时隔:</p>
                        <select class="form-control" id="sel">
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
                    <!-- <button type="button" @click="" class="btn btn-info sub_btn btn-block">提交</button> -->
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
                timer1:'',
                timer2:'',
                minHeight:'',
                dataObj:{
                    date:null,
                    value:null
                },
                sensorObj:{
                    sensorList:[
                        {id:1, type:"空气温度"},
                        {id:2, type:"空气湿度"},
                        {id:3, type:"土壤温度"},
                        {id:4, type:"土壤湿度"},
                        {id:5, type:"臭氧"},
                        {id:6, type:"光照强度"},
                        {id:7, type:"气压"},
                        {id:8, type:"雨量"},
                        {id:9, type:"蒸发量"},
                        {id:10, type:"风速"},
                        {id:11, type:"风向"},
                        {id:12, type:"PM2.5"},
                        {id:13, type:"PM1"},
                        {id:14, type:"PM10"},
                    ],
                    sensorsSelected:1
                }
            }
        },
        watch:{
            dataObj:{
                handler:function(val,oldValue){
                    this.drawLine();
                },
                deep:true
            }
        },
        created(){
            this.$emit('header', true);
            this.$emit('footer', true);
        },
        mounted(){
            this.chooseValue();
        },
        methods: {
            chooseValue(){
                let id = this.sensorObj.sensorsSelected;
                this.getdata(id);
            },
            drawLine(this_=this){
                let sensor = this_.sensorObj.sensorList[this_.sensorObj.sensorsSelected-1];
                let myChart = echarts.init(document.getElementById('chart_example'),'light');
                let option = {
                    title : {
                        text: sensor.type + '监测',
                        subtext: '湖南文理学院'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:[sensor.type]
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
                            data: this_.dataObj.date,
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:sensor.type,
                            data: this_.dataObj.value,
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
                        }
                    ]
                };
                myChart.setOption(option);
                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize',function() {myChart.resize()});
                this.minHeight = document.documentElement.clientHeight - 230;
                window.onresize = function (this_ = this) {
                    this_.minHeight = document.documentElement.clientHeight - 230
                }
            },
            getdata(sensor=10, this_=this) {
                axios({
                    url: "http://47.106.83.135:8000/sponge/avg_data/sensor?sensor_id=" + String(sensor),
                    method: 'get',
                    type: 'json',
                    headers: this_.my_header
                }).then(function (res) {
                    // console.log(res);
                    var data = res.data.data;
                    var len = data.length;
                    var timearr = [];
                    var valueArr = [];
                    for (var i = 0; i < len; i++) {
                        timearr.push(data[i].datetime);
                        valueArr.push(data[i].value);
                    }
                    this_.dataObj.date = timearr;
                    this_.dataObj.value = valueArr;
                    console.log(this_.dataObj,123123);
                    // if (len !== 0) {
                    //     // 初始化图表
                    //     this_.drawLine()
                    // } else {
                    //     // 以下是暂无数据显示样式(样式根据本身需求进行调整)
                    //     var html = '<div><sapn style="font-size: 18px;font-weight: bold;">图表数据</sapn><span  style="position: absolute;top: 40%;margin-left: 10%;color:#868686; font-size: 20px;">暂无数据</span></div>'
                    //     document.getElementById('chart_example').innerHTML = html
                    //     document.getElementById('chart_example').removeAttribute('_echarts_instance_')
                    // }
                })
            },
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
