<template>
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
</template>
<script>
    export default {
        name: 'app-header',
        data () {
            return {
            }
        },
        methods:{
        },
        created(){
        }
    }
    </script>
