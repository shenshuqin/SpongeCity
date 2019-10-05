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
        <div class="container-fluid admin">
            <div class="row">
                <div class="col-md-8 mt20">
               <el-button @click="dialogVisible = true" size="medium" type="primary" icon="el-icon-circle-plus-outline" style="background-color: #428bca">添加</el-button>
                </div>
                <div class="col-md-4  mt20 ">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item >
                            <el-input v-model="formInline.user" placeholder="查询"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="medium" type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="main container-fluid">
                    <router-link class="" to="/sensor">
                    <el-card class="box-card " style="display: inline-block" v-for="item in data" :key="item.id">
                    <!-- item取值 data[0] data[1]...                        -->
                        <div class="box-header">
                            <span>基站1</span>
                            <span class="iconfont fonts" style="margin-left: 20px">&#xe651;</span>
                            <i @click="dialogVisible2 = true" class="el-icon-edit-outline pull-right"></i>
                        </div>
                        <div class="box-main">
                            <p>设备ID:{{item.nid}}</p>
                            <p>地点:{{item.name}}</p>
                            <p>状态:{{item.status}}</p>

                        </div>
                    </el-card>
                    </router-link>
                </div>
            </div>
            </div>
        <el-dialog title="添加基站" :visible.sync="dialogVisible" width="36%">
            <el-form ref="form" :model="form" label-width="80px" id="form_body">
                <el-form-item label="设备ID">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="地点">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form.status"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">立即创建</el-button>
      </span>
        </el-dialog>

        <el-dialog title="修改基站" :visible.sync="dialogVisible2" width="36%">
            <el-form ref="form" :model="form2" label-width="80px" id="form_body2">
                <el-form-item label="设备ID">
                    <el-input v-model="form2.id"></el-input>
                </el-form-item>
                <el-form-item label="地点">
                    <el-input v-model="form2.address"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form2.status"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" >
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">立即修改</el-button>
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
                dialogVisible:false,
                dialogVisible2:false,
                my_header: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + getCookie('token')
                },
                form: {
                    name: '',
                    number:''
                },
                form2: {
                    name: '',
                    number:''
                },
                msg:getCookie("username"),
                // value: true
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        mounted(){
            //作用域1
            this.getdata();//this指当前的vue实例的作用域 即作用域1
        },
        //作用域1
        methods:{
            onSubmit() {
                console.log('submit!');
            },
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
                    console.log(res.data.data);
                    var new_data = res.data.data;
                    // var len = new_data.length;
                    console.log(this_.data);
                    this_.$set(this_, "data", new_data);//将this_.data的索引为0的元素设置成data 原型 Vue.$set(object, key/index, value/object)
                    //
                    console.log(this_.data);
                    //Vue.set(this_.data, 0, data)

                    // for(var i=0;i<len;i++){
                    //     this_.id =data[i].nid;
                    // }
                });
            },
        }
    }
</script>
<style scoped>
    .admin{
        border-top:1px solid #ccc;
    }
    .mt20{
        margin-top: 20px;
        /*border:1px solid red;*/
    }
    .main{
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        /*border:1px solid red;*/
    }
   .main .box-card{
        width:33%;
        margin-right: 10px;
        height:200px;
    }
    .main .box-card:hover{
        background-color: #f3f6fd;
    }
   .main .box-header{
       border-bottom:1px solid #ccc;
   }
   .main .box-main{
       margin-top: 16px;
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
</style>
