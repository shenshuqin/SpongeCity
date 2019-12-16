<template>
    <div class="home">
        <div class="main" >
            <img src="http://hlimgserver.oss-cn-shanghai.aliyuncs.com/img/about.png">
        </div>
        <div class="section1 container-fluid" :style="{minHeight:minHeight+'px'}">
            <div class="sec_title"><span>首页</span>><span>关于我们</span>><span>项目介绍</span></div>
            <div class="sec_cont">
                <p class="cont_title">项目简介</p>
                <p class="cont_main">海绵城市建设专注于海绵城市设计、产品制造与施工建设的创新型科技企业。在雨水渗透领域，开发了专利产品透水海绵砖、透水混凝土路面、雨水渗透管、雨水渗透井、渗透沟等透水产品，全面解决雨水渗透排放问题，改善城市积水、洪涝等现象。在雨水收集领域，公司具有领先的专利产品和技术优势，设计了国内领先的自流型雨水弃流过滤装置、雨水自动过滤器、雨水控制器、可清洗雨水蓄水模块等产品。在黑臭水体治理领域，自主研发的河道净化设备已获得多项专利。公司拥有美丽乡村配套设施，污水处理工艺--土壤法（独有专利技术）。在废气处理领域，具有雄厚的技术实力和自主研发设备。公司注重品质，不断完善自身，努力为客户奉献更好的产品和服务，携手共建海绵城市。</p>
            </div>
        </div>
    </div>
</template>
<script>
    import {getCookie} from '../../public/js/cookie.js';
    export  default {
        data(){
            return{
                msg:getCookie("username"),
                 minHeight:'',
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight - 380;
            console.log( this.minHeight);
            var this_ = this;
            window.onresize = function () {
                this_.minHeight = document.documentElement.clientHeight - 380
            }
        },
        methods:{

        }
    }
</script>
<style scoped>
    .sec_title{
        width:100%;
        height: 30px;
        line-height: 30px;
        padding-left: 80px;
        font-size: 12px;
        background-color: #f9f9f9;
    }
    .sec_title span{
     color: #21395f;
    }
    .cont_title{
        width:100%;
        font-size: 20px;
        color: #4C4C4C;
        height: 30px;
        line-height: 30px;
        font-family: "黑体";
        text-align: center;
        margin-top: 20px;
    }
    .cont_main{
        width:70%;
        color: #666666;
        line-height: 30px;
        margin:50px auto;
        text-indent:25px;
        /* border:1px solid red; */
    }
    .sec_cont{
        /* display: flex;
        align-items: center;
        justify-content: center; */
    }
    .section1{
        width:100%;
        height:auto;
        /* border:1px solid red; */
    }
</style>
