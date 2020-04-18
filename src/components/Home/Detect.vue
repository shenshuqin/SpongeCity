<template>
    <div class="home">
        <div class="main">
            <img src="http://hlimgserver.oss-cn-shanghai.aliyuncs.com/img/main.jpg">
        </div>
         <div class="mains container-fluid"  :style="{minHeight:minHeight+'px'}">
            <div class="row">
                <div class="col-md-6 raill-left">
                    <p class="raillflow-title">监测</p>
                    <div class="form-group">
                          <p for="sel1" style="font-size: 16px"><span class="iconfont rb">&#xe60b;</span>&nbsp;选择传感器类型:</p>
                        <select class="form-control" id="sel0" v-model="sensorObj.sensorsSelected" >
                            <option v-for="(item,index) in sensorObj.sensorList" :key="index" :value="item.id">{{item.type}}</option>
                        </select>
                        <p for="sel1" style="font-size: 16px"><span class="iconfont rg">&#xe6af;</span>&nbsp;选择时隔:</p>
                        <select class="form-control" id="sel" v-model="timeInterval.intervalSelected" >
                            <option v-for="(item,index) in timeInterval.interval" :key="index" :value="item.id">{{item.type}}</option>
                        </select>
                        <!-- <p for="sel1" style="font-size: 16px"><span class=" rb iconfont">&#xe61f;</span>&nbsp;选择地点:</p> -->
                        <!-- <select class="form-control select_address" id="sel1"> -->
                            <!-- <option v-for="address in data" :key="index">{{address.address1}}</option>-->
                            <!-- <option id="index0">鼎城区</option>
                            <option id="index1">澧县</option>
                            <option id="index2">临澧</option>
                        </select> -->
                        <!-- <select class="form-control select_address" id="sel2">
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
                        </select> -->
                    </div>
                    <div class="form-inline times">
                        <p id="time" style="font-size: 16px"><span class=" rr iconfont">&#xe6e4;</span>&nbsp;选择时间段</p>
                        <!-- <input class="form-control" id="time_start" type="date" value="2019-09-24"/> -->
                         <el-date-picker id="time_start"
                                v-model="time_start"
                                type="date"
                                placeholder="选择日期">
                                </el-date-picker>
                         <span>至</span>
                        <!-- <input class="form-control" id="time_end" type="date" value="2019-09-24"/> -->
                            <el-date-picker id="time_end"
                                v-model="time_end"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                    </div>
                    <button type="button" @click="getdata()" class="btn btn-info sub_btn btn-block">提交</button>
                </div>
                <div class="col-md-6 raill-right">
                    <div id="chart_example" style="width:560px;height:500px;">
                    </div>
                </div>
            </div>
        </div>
        <!-- main end -->
    </div>
</template>
<script>
    import axios from 'axios'
     import Api from '../../api/api'
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
                 pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        }
                    }]
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
                },
                timeInterval:{
                    interval:[
                        {id:1,type:'时'},
                        {id:2,type:'天'},
                        {id:3,type:'月'},
                    ],
                    intervalSelected:1
                },
                time_start: "",//1560873600
                time_end: "",
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
            this.getdata();
            this.minHeight = document.documentElement.clientHeight - 230;
            var this_ = this;
            window.onresize = function () {
                this_.minHeight = document.documentElement.clientHeight - 230
            }
        },
        methods: {
            
            drawLine(this_=this){
                let sensor = this_.sensorObj.sensorList[this_.sensorObj.sensorsSelected-1];
                let myChart = echarts.init(document.getElementById('chart_example'),'light');
                let option = {
                    title : {
                        text: sensor.type + '监测',
                        subtext: '湖南文理学院',
                       
                    },
                     grid:{
                        top:'20%',//距上边距
                        left:'5%',//距离左边距
                    },
                    textStyle: {
                        // color: "red",
                        // fontSize: "12",
                        // margin:'30px'
                     },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:[sensor.type],
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
                if (this_.dataObj.date.length === 0) {
                    console.log("暂无数据");
                    // 以下是暂无数据显示样式(样式根据本身需求进行调整)
                    var html = '<div><sapn style="font-size: 18px;font-weight: bold;">图表数据</sapn><span  style="position: absolute;top: 40%;margin-left: 10%;color:#868686; font-size: 20px;">暂无数据</span></div>'
                    document.getElementById('chart_example').innerHTML = html
                    document.getElementById('chart_example').removeAttribute('_echarts_instance_')
                }
            },
            getdata() {
                let this_=this;
                console.log(this.time_start);
                this.start = Date.parse(this.time_start) || "1560873600000";
                this.end = Date.parse(this.time_end) || Date.parse(new Date());//如果end参数为"" 则改为当前时间戳
                let args = `sensor_id=${this.sensorObj.sensorsSelected}&start=${String(this.start).substr(0, 10)}&end=${String(this.end).substr(0, 10)}&interval=${this.timeInterval.intervalSelected}`;
               Api.sensorData(args).then(res=>{
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
                })
                .catch(err=>{

                })
            },
        },
        beforeDestroy() {
            clearInterval(this.timer1);
            clearInterval(this.timer2);
        }
    }
</script>
<style>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 145px;
}
</style>
<style scoped >
    .raillflow{
        background-color: #F8FAFC;
    }
    .mains{
        max-width: 980px;
        margin:100px auto;
    }
    .mains .raillflow-title{
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
        width:50%;
        /* border:1px solid red; */
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
