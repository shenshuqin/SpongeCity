<template>
    <div class="login">
        <!-- <div class="cloud"><img src="cloud.png" alt=""></div> -->
        <div class="cloud_word">
        <div class="cloud">
            <img src="../../public/images/cloud01.png" alt="">
            <img src="../../public/images/cloud02.png" alt="">

        </div>
        <div class="title_sp">海绵城市监测系统</div>
        </div>
        <div class="login-wrap" action="">
            <img class="avatar" src="../../public/images/default.png">
            <div id="dmsg" class="alert alert-danger" style="display: none">
                <strong class="msg"></strong>
            </div>
            <div class="form-group">
                <label class="sr-only">用户名</label>
                <input v-model.trim="username" id="email" name="email"  class="form-control" placeholder="用户名" autofocus value="">
            </div>
            <div class="form-group">
                <label for="password" class="sr-only">密码</label>
                <input v-model.trim="password" id="password" name="password" type="password" class="form-control" placeholder="密码">
            </div>
                <button class="btn btn-primary btn-block" @click="login">登 录</button>
        </div>
    </div>

</template>
<script>
    import {setCookie,getCookie} from '../../public/js/cookie.js'
    import axios from 'axios'
    //跨域请求???
    axios.defaults.withCredentials = true;
    //export default 指定模块的默认输出，一个模块只能有一个默认输出
    export default{
        data(){
           // 使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件。
            return {
                username:'',
                password:''
            }
        },
        mounted() {

        },
        methods: {
            login() {
                var  _this=this;
                var md5Pswd = this.$md5(this.password).toLocaleUpperCase(); // 将密码进行MD5加密
                var data={
                    "username":this.username,
                    "password":md5Pswd
                };
                axios({
                    url: 'http://47.106.83.135:80/sponge/user/login',
                    method:'post',
                    dataType: 'json',
                    //发送格式为json
                    data:data,
                    headers:
                       {
                         'Content-Type': 'application/json'
                       }
                }).then(res => {
                    console.log("00");
                    if(res.data.status === 1){
                        console.log(res)
                        // console.log(_this.username);
                        // console.log(res.data.data[0].token);
                        setCookie("token",res.data.data[0].token);
                        setCookie("username",_this.username);
                        $(".msg").text("登录成功!");
                        _this.$router.push({path:'/home'})
                    }else{
                        console.log("失败");
                        $("#dmsg").css("display","block").addClass("shake animated");
                        $(".msg").text("用户名或密码错误!")
                    }

                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
    </script>
