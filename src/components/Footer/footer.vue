<template>
    <div class="footer container-fluid" id="foo">
        <div class="row">
            <div class="col-md-4 footer_box">
                <router-link class="" to="/home"><p>首页</p></router-link>
                <router-link class="" to="/about"><p>关于我们</p></router-link>
            </div>
            <div class="col-md-4 footer_box">
                <router-link class="" to="/detect"><p>监测中心</p></router-link>
                <router-link class="" to="/map"><p>基地展示</p></router-link>
            </div>
            <div class="col-md-4 footer_box">
                <p>联系方式</p>
                <p>电话:18229695956</p>
                <p>邮箱:2934103556@qq.com</p>
                <p>地址:湖南省常德市武陵区湖南文理学院创客空间</p>
            </div>
            <p class="text-center"> Copyright © 2019</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'app-footer',
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

