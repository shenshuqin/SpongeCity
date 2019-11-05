<template>
    <div>
<!--        <div class="navs">-->
<!--            <div class="container-fluid">-->
<!--                <div class="row">-->
<!--                    <div class="navs-left col-xs-8 col-sm-8 col-md-8 col-lg-8">-->
<!--                        <router-link class="navbar-brand" to="/home" >-->
<!--                            <img class="logo" alt="Brand" src="../../public/images/logo.png">-->
<!--                        </router-link>-->
<!--                        <a href="#" class="navbar-brand navbar-link">海绵城市监测系统</a>-->
<!--                    </div>-->
<!--                    <div class="navs-right col-xs-4 col-sm-4 col-md-4 col-lg-4">-->
<!--                        <p class="navbar-text navbar-right">-->
<!--                            <span class="iconfont fonts">&#xe6de;</span>-->
<!--                            <span style="font-size:15px;padding-left: 10px">{{msg}}</span>-->
<!--                        </p>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <div class="container-fluid admin" :style="{minHeight:minHeight+'px'}">
            <div class="row">
                <div class="col-md-8 mt20">
               <el-button @click="dialogVisible = true" size="medium" type="primary" icon="el-icon-circle-plus-outline" style="background-color: #428bca">添加</el-button>
                </div>
                <div class="col-md-4  mt20 ">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item >
                            <el-input v-model="formInline.user" placeholder="基站名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="medium" type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="main container-fluid">

                    <el-card class="box-card " style="display: inline-block" v-for="(item,index) in data" :key="item.id">
                    <!-- item取值 data[0] data[1]...                        -->
                        <div class="box-header">
                            <span>基站{{item.nid}}</span>
<!--                            <button class="btn btn-default btn-xs" @click="remove(item.nid)" style="margin-left: 30px">删除</button>-->
                            <i @click="remove(item.nid)" style="margin-left: 20%" class="glyphicon glyphicon-trash"></i>
                            <i @click="dialogVisible2 = true;select(item.nid)" class="el-icon-edit-outline pull-right"></i>
                        </div>
                        <router-link class="box-main" :to="{path:'/sensor',query:{sensor_id:item.nid}}">
<!--                        <div class="box-main" @click="jump(index)">-->
                        <div class="box-main" >
                            <p>设备ID:{{item.nid}}</p>
                            <p>地点:{{item.name}}</p>
                            <p>经纬度:{{item.location}}</p>
                            <p>状态:{{item.status}}</p>

                        </div>
                        </router-link>
                    </el-card>

                </div>
            </div>
            </div>
        <el-dialog title="添加基站" :visible.sync="dialogVisible" width="36%">
            <el-form ref="form" :model="form" label-width="80px" id="form_body">
                <el-form-item label="基站名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="基站ID">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="地点">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="经纬度">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form.status"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;add()">立即创建</el-button>
      </span>
        </el-dialog>

        <el-dialog title="修改基站" :visible.sync="dialogVisible2" width="36%">
            <el-form ref="form" :model="form2" label-width="80px" id="form_body2">
                <el-form-item label="基站名">
                    <el-input v-model="form2.name" ></el-input>
                </el-form-item>
                <el-form-item label="基站ID">
                    <el-input v-model="form2.id"></el-input>
                </el-form-item>
                <el-form-item label="地点">
                    <el-input v-model="form2.address"></el-input>
                </el-form-item>
                <el-form-item label="经纬度">
                    <el-input v-model="form2.location"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form2.status"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" >
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false;modefy()">立即修改</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
    import {getCookie} from '../../public/js/cookie.js';
    import axios from 'axios';
    export  default {
        data(){
            return{
                data: [],
                minHeight:'',
                dialogVisible:false,
                dialogVisible2:false,
                my_header: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + getCookie('token')
                },
                form: {
                    name: '',
                    id:'',
                    address:'',
                    location:'',
                    status:''
                },
                form2: {
                    name: '',
                    id:'',
                    address:'',
                    location:'',
                    status:''
                },
                msg:getCookie("username"),
                // value: true
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },

        created(){
            this.$emit('header', true);
            this.$emit('footer', true);
            //作用域1
            this.getdata();//this指当前的vue实例的作用域 即作用域1
        },
        mounted(){
            this.minHeight  = document.documentElement.clientHeight-230;
            var this_ = this;
            window.onresize = function(){
                this_.minHeight = document.documentElement.clientHeight-230
            }
        },
        //作用域1
        methods:{
            // jump(index){
            //     let this_ = this;
            //     this_.$router.push({
            //         path:"/sensor",
            //         query:{
            //             id:this_.data[index].nid,
            //
            //         }
            //
            //     })
            // },
            onSubmit(this_ = this) {
                axios({
                    // url: ' http://localhost:3001/rail',
                    url: 'http://47.106.83.135:80/sponge/nodes/list',
                    method: 'post',
                    type: 'json',
                    data:{name:this_. formInline.user},
                    headers: this.my_header

                }).then(function (res) {
                    // this_.getdata()
                    window.location.reload();
                });
            },
            //作用域1
            getdata(this_ = this){//作用域1
                //作用域2 this undefined
                axios({
                    // url: ' http://localhost:3001/rail',
                    // url: 'https://www.test.com',
                    url: 'http://47.106.83.135:80/sponge/nodes/list',
                    method: 'get',
                    type: 'json',
                    headers: this.my_header

                }).then(function (res) {
                    // console.log(res)
                    var new_data = res.data.data;
                    this_.$set(this_, "data", new_data);//将this_.data的索引为0的元素设置成data 原型 Vue.$set(object, key/index, value/object)
                    console.log(this_.data)
                });
            },
            add(this_ = this){
                axios({
                    // url: ' http://localhost:3001/rail',
                    url: 'http://47.106.83.135:80/sponge/nodes/list',
                    method: 'post',
                    type: 'json',
                    data:{name:this_.from.name,id:this_.form.id,address:this_.form.address,location:this_.form.location,status:this_.form.status},
                    headers: this.my_header

                }).then(function (res) {
                // 调用成功重新刷新页面
                //     var res = res.body;
                //     if(res.code == 200){
                //         this_.getdata();
                //     }
                    window.location.reload();
                });
            },
            remove(nid){
                var this_= this;
                this.$http.post('/list',{
                    params: {
                        nid: nid
                    }
                }).then(res => {
                    console.log(res)
                    this_.data = res.data.data;
                });
                // axios({
                //     // url: ' http://localhost:3001/rail',
                //     url: '/list',
                //     method: 'post',
                //     type: 'json',
                //     data:{nid:nid},
                //     headers: this.my_header
                //
                // }).then(function (res) {
                //     // console.log(res)
                //     // window.location.reload();
                // });
            },
            selsect(id){
                var this_ = this;
                axios({
                    // url: ' http://localhost:3001/rail',
                    url: 'http://47.106.83.135:80/sponge/nodes/list',
                    method: 'post',
                    type: 'json',
                    data:{id:id},
                    headers: this.my_header

                }).then(function (res) {
                    this_.form2.name = res.nid;
                    this_.form2.id = res.nid;
                    this_.form2.address = res.nid;
                    this_.form2.location = res.nid;
                    this_.form2.status = res.nid;
                });
            },
            modefy(this_ = this){
                axios({
                    // url: ' http://localhost:3001/rail',
                    url: 'http://47.106.83.135:80/sponge/nodes/list',
                    method: 'post',
                    type: 'json',
                    data:{name:this_.from.name,id:this_.form.id,address:this_.form.address,location:this_.form.location,status:this_.form.status},
                    headers: this.my_header

                }).then(function (res) {
                    window.location.reload();
                });
            },
        }
    }
</script>
<style scoped>
    .admin{
        /*border-top:1px solid #ccc;*/
        margin-top: 80px;
        /*height: 500px;*/
    }
    .mt20{
        margin-top: 20px;
        /*border:1px solid red;*/
    }
    .main{
        text-decoration: none;
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        /*border:1px solid red;*/
    }
   .main .box-card{
        width:33%;
        margin-right: 10px;
        height:200px;
       text-decoration: none;
    }
    .main .box-card:hover{
        background-color: #f3f6fd;
    }
   .main .box-header{
       border-bottom:1px solid #ccc;
   }
   .main .box-main{
       color:#222222;
       margin-top: 16px;
       text-decoration: none;
   }
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 480px;
    }
    #form_body{
       margin-bottom: -20px;
    }
    .fonts{
        margin-left: 20px
    }
</style>
