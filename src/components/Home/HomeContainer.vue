<template>
    <div class="home">
        <div class="navs">
            <div class="container-fluid">
                <div class="row">
                    <div class="navs-left col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <a class="navbar-brand" href="#">
                            <img class="logo" alt="Brand" src="../../images/logo.png">
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
    <div class="main">
    <img src="../../images/main.jpg">
    </div>
    <div class="container-fluid">
        <div class="row">
<!--            <p class="title">监测模块</p>-->
            <p class="title"><img src="../../images/title.png"></p>
            <router-link class="" to="/rainflow">
            <div class="box col-md-4" >
                <div class="box-main center-block ml100" >
                    <p class="iconfont">&#xe623;</p>
                    <p>雨量监测</p>
                </div>
            </div>
            </router-link>
            <router-link class="" to="/waterlevel">
            <div class="box col-md-4">
                <div class="box-main center-block">
                    <p class="iconfont">&#xe622;</p>
                    <p>水位监测</p>
                </div>
            </div>
            </router-link>
            <router-link class="" to="/waterflow">
            <div class="box col-md-4">
                <div class="box-main center-block mr100">
                    <p class="iconfont">&#xe66b;</p>
                    <p>水流量监测</p>
                </div>
            </div>
            </router-link>
            <router-link class="" to="/totleflow">
            <div class="box col-md-4">
                <div class="box-main center-block ml100">
                    <p class="iconfont">&#xe659;</p>
                    <p>年径总流量监测</p>
                </div>
            </div>
            </router-link>
            <router-link class="" to="/rainutl">
            <div class="box col-md-4">
                <div class="box-main center-block">
                    <p class="iconfont">&#xe61c;</p>
                    <p>雨水利用率监测</p>
                </div>
            </div>
            </router-link>
            <div class="box col-md-4">
                <div class="box-main center-block mr100">
                    <p class="iconfont">&#xe693;</p>
                    <p>水流量监测</p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    export  default {
        data(){
            return{
                msg:"shenshuqin"
            }
        }
    }
    </script>
