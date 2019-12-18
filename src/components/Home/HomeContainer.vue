<template>
    <div class="home">
    <div class="main">
        <el-carousel indicator-position="outside" height="400px">
            <el-carousel-item >
                <h3>海绵城市监测系统</h3>
            </el-carousel-item>
            <el-carousel-item >
                <h3>海绵城市监测系统</h3>
            </el-carousel-item>
            <el-carousel-item >
                <h3>海绵城市监测系统</h3>
            </el-carousel-item>
        </el-carousel>
<!--项目介绍-->~
        <div class="section1 container-fluid">
            <div class="row">
            <div class="sec_title">
                <p>PROJECT INTRODUCTION</p>
                <p style="color:#222222">项目介绍</p>
            </div>
            <div class="sec_main">
                <div class="left col-md-6">
                    <img src="../../public/images/school.jpg">
                </div>
                <div class="right col-md-6">
                    <p class="line"></p>
                    <p class="right_cot">构建低影响开发雨水系统，规划控制目标一般包括径流总量控制、径流峰值控制、径流污染控制、雨水资源化利用等。各地应结合水环境现状、水文地质条件等特点，合理选择其中一项或多项目标作为规划控制目标。鉴于径流污染控制目标、 雨水资源化利用目标大多可通过径流总量控制实现， 各地低影响开发雨水系统构建可选择径流总量控制作为首要的规划控制目标。</p>
                    <!-- <button type="button" class="btn btn-info more">查看更多</button> -->
                </div>

            </div>
            </div>
        </div>
<!--       section1 end-->
        <div class="contentpart">
            <div class="">
                <div class="picture">
                <picture>
                    <source type="image/webp" srcset="http://hlimgserver.oss-cn-shanghai.aliyuncs.com/img/bg.jpg">
                    <img class="image" src="http://hlimgserver.oss-cn-shanghai.aliyuncs.com/img/bg.webp">
                </picture>
                </div>
                <div class="indexabout text-center">
                    <h4 style="font-size: 18px">项目简介</h4>
                    <h2>携手共建海绵城市，缔造中国都市新面貌！</h2>
                    <p>海绵城市建设专注于海绵城市设计、产品制造与施工建设的创新。在雨水渗透领域，开发了专利产品透水海绵砖、透水混凝土路面、雨水渗透管、雨水渗透井、渗透沟等透水产品，全面解决雨...</p>
                </div>
            </div>
            <div class="section3 container-fluid">
                <div class="row">
                    <div class="sec_title">
                        <p>ITEM ADVANTAGE</p>
                        <p>项目优势</p>
                    </div>
                    <div>
                        <div class="container-fluid sec3">
                            <div class="row sec3_main ">
                                <div class="col-md-3 item">
                                    <div class="youshipart text-center">
                                        <div class="icon-wrapper">  <span class="iconfont fonts">&#xe610;</span>  </div>
                                        <h3>先进的硬件技术</h3>
                                        <div class="word">结合最先进的工艺和独家专利技术，研发出创造新型环保透水砖，为海绵城市建设添砖加瓦。</div>
                                    </div>
                                </div>
                                <div class="col-md-3 item">
                                    <div class="youshipart text-center">
                                        <div class="icon-wrapper"> <span class="iconfont fonts">&#xe612;</span> </div>
                                        <h3>可靠的实力</h3>
                                        <div class="word">专注海绵城市，多年产品研发经验，众多项目实例积淀，流程规范化管理，技术实力遥遥领先。</div>

                                    </div>
                                </div>

                                <div class="col-md-3 item">
                                    <div class="youshipart text-center">
                                        <div class="icon-wrapper"> <span class="iconfont fonts">&#xe60b;</span> </div>
                                        <h3>一站式服务</h3>
                                        <div class="word">渗透海绵城市的各个环节，设计方案，产品生产，现场施工，技术咨询等，每一步都有专业技术团队管控，免去后顾之忧。</div>
                                    </div>
                                </div>
                                <div class="col-md-3 item">
                                    <div class="youshipart text-center">
                                        <div class="icon-wrapper"> <span class="iconfont fonts">&#xe7b4;</span></div>
                                        <h3>长远发展眼光</h3>
                                        <div class="word"> 不断完善和改进现有产品服务的同时，开拓海绵城市理念的新领域，挖掘新技术，扩展新市场。</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--  sec3 end-->
        </div>
        </div>
<!--        main end-->

    </div>
</template>
<script>
    export  default {
        data(){
            return{

            }
        },
        created:function () {
            this.$emit('header', true);
            this.$emit('footer', true);
        },
        mounted(){
            this.animate();
        },
        methods:{
            animate(){
                $(".item").hover(function(){
                    $(this).addClass("animated swing");
                },function() {
                    // 鼠标移出时移出hover类
                    $(this).removeClass('animated swing')
                });
            },
        }
    }
    </script>
<style scoped>
    .word{
        width:80%;
        /*border:1px solid red;*/
        margin: 30px auto;
        letter-spacing: 3px;
        line-height: 20px;
    }
    .home{
        display: flex;
        flex-direction: column;
    }
    .main{
        flex: 1;
    }
    .el-carousel__item h3 {
        color: #fff;
        font-size: 35px;
        /*opacity: 0.75;*/
        line-height: 300px;
        margin-left:280px;
        margin-top: 20px;
        font-family: '黑体';
    }
    .el-carousel__item:nth-of-type(1){
        background: url("http://hlimgserver.oss-cn-shanghai.aliyuncs.com/img/slide2.png");
        background-size: 100% 100%;
    }
    .el-carousel__item:nth-of-type(2){
        background: url("http://hlimgserver.oss-cn-shanghai.aliyuncs.com/img/slide1.png");
        background-size: 100% 100%;
    }
    .el-carousel__item:nth-of-type(3){
        background: url("http://hlimgserver.oss-cn-shanghai.aliyuncs.com/img/slide2.png");
        background-size: 100% 100%;
    }
    .section1,.section2{
        width:100%;
        height: auto;
        margin-top: 40px;
    }
    .section3 {
        /*margin-top: -160px;*/
        height:465px;
        width:100%;
        z-index: 999;
        position:absolute;
        top:340px;
        left:0;
        /* border:1px solid red; */
    }
    .sec_title{
        width:100%;
        height:auto;
        text-align: center;
        color:#fff;
        /*border:1px solid red;*/
    }
    .sec_title p:nth-of-type(1){
        font-size: 26px;
        font-weight: bold;
        /*color:#222222;*/
    }
    .sec_title p:nth-of-type(2){
        font-size: 20px;
        /*color:#4C4C4C;*/
        position:relative;
    }
    .sec_title p:nth-of-type(2):before{
        content: '';
        width:55px;
        height: 2px;
        background-color:#8c8c8c;
        position:absolute;
        top:40%;
        left:40%;
    }
    .sec_title p:nth-of-type(2):after{
        content: '';
        width:55px;
        height: 2px;
        background-color: #8c8c8c;
        position:absolute;
        top:40%;
        right:40%;
    }
    .sec_main{
        margin-top: 40px;
    }
    .left{
        /*border:1px solid red;*/
        height: auto;
    }
    .left img{
        width:56%;
        height: 250px;
        margin-left:40%;
    }
    .right .line{
        width:68px;
        height: 2px;
        background-color: #296eaf;
        margin-top: 20px;
    }
    .right_cot{
        width:72%;
        height:auto;
        margin-top: 60px;
        font-size: 14px;
        font-family: "黑体";
        line-height: 30px;
        margin-bottom: 20px;
        /*border:1px solid red;*/
    }
     .more{
         /*margin-left: 20px;*/
         width:120px;
    }
    .sect2_main{
        width:60%;
        height: auto;
        /*border:1px solid red;*/
        margin: 30px auto;
        display: flex;
        flex-flow: wrap;
        flex-direction: row;
    }
    .sect2_main div{
        width:50%;
        position:relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;

    }
    .sect2_main div img{
        width:96%;

    }
    .sect2_main div p{
        position: absolute;
        top:45%;
        left:45%;
        color:#fff;
        font-size: 30px;
    }
    .contentpart{
        /*margin-top: 40px;*/
        margin-bottom: 40px;
        /*padding: 60px 0;*/
        width:100%;
        height:800px;
        /*border:1px solid red;*/
        position: relative;
        /*background: #d8d8d8 url(../../public/images/bg.jpg) no-repeat center center fixed !important;*/
    }
    .picture{
        width:100%;
        height:800px;
        /*border:1px solid red;*/
    }
    .picture img{
        width:100%;
        height:786px;
    }
    .indexabout {
        /*padding: 30px 20%;*/
        position: absolute;
        top:100px;
        left:0;
        margin:20px 350px;
        color: #fff;
        font-size:16px;
        /*border:1px solid red;*/
    }
    .contentpart {
        padding: 60px 0;
    }
    .sec3_main{
        width:80%;
        margin: 0 auto;
    }
    .sec3{
       background: rgba(163, 160, 160, 0.5);
        /* border:1px solid #fff; */
        /* opacity:0.3; */
        /* border:1px solid red; */
    }
    .youshipart {
        width:100%;
        margin: 20px;
        background: #fff;
        min-height: 280px;
        border-radius:8px;
        /*border:1px solid red;*/
    }
    .icon-wrapper {
        position: relative;
        height: 80px;
        margin-bottom: 30px;
    }
    .icon-wrapper{
        position: relative;
        height: 60px;
        line-height: 60px;
        padding-top: 30px;
        margin-bottom: 40px;
    }
    .fonts{
        font-size: 35px;
    }
</style>
