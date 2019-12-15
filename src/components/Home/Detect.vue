<template>
    <div class="home">
        <div id="navbar-top">
            <nav class="navbar navbar-default navbar-static navbar-fixed-top" role="navigation" data-spy="affix">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span class="sr-only">切换菜单</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand homeback" href="#">
                            <!--                        <img class="logo" alt="Brand" src="../../public/images/logo.png">-->
                            <!--                        <span href="#" class="">海绵城市监测系统</span>-->
                        </a>
                    </div>
                    <div class="collapse navbar-collapse">
                        <ul class="nav navbar-nav navbar-right">
                            <li >
                                <router-link class="" to="/home">
                                    <span>首页</span>
                                </router-link>
                            </li>
                            <li class="dropdown">
                                <router-link class="" to="/about">
                                    <span class="dropdown-toggle scrollTo">关于我们</span>
                                </router-link>
                            </li>
                            <li class="dropdown">
                                <router-link class="" to="/detect">
                                    <span class="dropdown-toggle scrollTo">监测中心</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link class="" to="/map">
                                    <span  >基地展示</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link class="" to="/admin">
                                    <span  role="button" >后台管理</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div class="main">
            <img src="http://hlimgserver.oss-cn-shanghai.aliyuncs.com/img/main.jpg">
        </div>
        <div class="container-fluid sec clearfix">
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
        created:function () {
            this.$emit('header', true);
            this.$emit('footer', true);
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
    /*    background-color: #666666;*/
    /*}*/
    .houtai{
        border:none;
    }
    .sec{
        width:100%;
        height:auto;
        /*border:1px solid red;*/
        overflow: hidden;
    }
</style>
