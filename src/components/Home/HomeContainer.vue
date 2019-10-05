<template>
    <div class="home">
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
                            <router-link class="" to="/admin">
                            <span class="iconfont fonts">&#xe621;</span>
                            </router-link>
                            <span style="font-size:15px;padding-left: 10px">{{msg}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    <div class="main">
    <img src="../../public/images/main.jpg">
    </div>
    <div class="container-fluid">
        <div class="row">
<!--            <p class="title">监测模块</p>-->
            <p class="title"><img src="../../public/images/title.png"></p>
            <router-link class="" to="/rainflow">
            <div class="box col-md-4  " >
                <div class="box-main center-block ml100" >
                    <p class="iconfont">&#xe623;</p>
                    <p class="box-cont">雨量监测</p>
                </div>
            </div>
            </router-link>
            <router-link class="" to="/air">
            <div class="box col-md-4 ">
                <div class="box-main center-block">
                    <p class="iconfont">&#xe622;</p>
                    <p class="box-cont">空气监测</p>
                </div>
            </div>
            </router-link>
            <router-link class="" to="/soil">
            <div class="box col-md-4">
                <div class="box-main center-block mr100">
                    <p class="iconfont">&#xe66b;</p>
                    <p class="box-cont">土壤监测</p>
                </div>
            </div>
            </router-link>
            <router-link class="" to="/totleflow">
            <div class="box col-md-4 ">
                <div class="box-main center-block ml100">
                    <p class="iconfont">&#xe659;</p>
                    <p class="box-cont">臭氧,光照强度,气压监测</p>
                </div>
            </div>
            </router-link>
            <router-link class="" to="/wind">
            <div class="box col-md-4 ">
                <div class="box-main center-block">
                    <p class="iconfont">&#xe61c;</p>
                    <p class="box-cont">风速,风向监测</p>
                </div>
            </div>
            </router-link>
            <router-link class="" to="/pm">
            <div class="box col-md-4 ">
                <div class="box-main center-block mr100">
                    <p class="iconfont">&#xe693;</p>
                    <p class="box-cont">PM值监测</p>
                </div>
            </div>
            </router-link>
        </div>
    </div>
    </div>
</template>
<script>
    import {getCookie} from '../../public/js/cookie.js';
    export  default {
        data(){
            return{
                msg:getCookie("username")
            }
        },
        mounted(){
          this.arr();
          this.animate();
          this.mobile_css();
        },
        methods:{
            arr(){
                console.log(getCookie("username"))
            },
         animate(){
             $(".box-main").hover(function(){
                 console.log("1");
                 $(this).addClass("animated pulse");
             }, function() {
                  // 鼠标移出时移出hover类
                  $(this).removeClass('animated pulse')
             });

         },
            mobile_css(){
               var width =  window.screen.width;
               console.log(width)
                if(width<=768){
                    var dom =  $(".box-main");
                    dom.eq(0).removeClass('ml100');
                    dom.eq(2).removeClass('mr100');
                    dom.eq(3).removeClass('ml100');
                    dom.eq(5).removeClass('mr100');
                }
            }
        }
    }
    </script>
<style scoped>
 /*.box-main:hover{*/
 /*    background-color: #ccc;*/
 /*}*/
    .box-cont{

    }
    </style>
