<template>
    <div class="login">
        <!-- <div class="cloud"><img src="cloud.png" alt=""></div> -->
        <div class="cloud">
            <img src="../../images/cloud01.png" alt="">
            <img src="../../images/cloud02.png" alt="">
        </div>
        <form class="login-wrap" action=""  autocomplete="off" novalidate>
            <img class="avatar" src="../../images/default.png">
            <div id="dmsg" class="alert alert-danger" style="display: none">
                <strong class="msg"></strong>
            </div>
            <div class="form-group">
                <label for="email" class="sr-only">用户名</label>
                <input v-model.trim="username" id="email" name="email" type="email" class="form-control" placeholder="用户名" autofocus value="">
            </div>
            <div class="form-group">
                <label for="password" class="sr-only">密码</label>
                <input v-model.trim="password" id="password" name="password" type="password" class="form-control" placeholder="密码">
            </div>

<!--            <router-link class="" to="/home">-->
                <button class="btn btn-primary btn-block" @click="login">登 录</button>
<!--            </router-link>-->
        </form>
    </div>

</template>
<script>
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
        methods: {
            login() {
                //处理axio发送的数据
                var params = new URLSearchParams();
                params.append('username', this.username);
                params.append('password', this.password);
                axios.post(this.HOST+'/home/system/login',params).then(res => {
                    if(res.data.code ==1){
                        $(".msg").text("登录成功!")
                        sessionStorage.username = this.username;
                        this.$router.push({path:'/home'})
                    }else{
                        $("#dmsg").css("display","block").addClass("shake animated");
                        $(".msg").text("用户名或密码错误!")
                    }
                })
                // axios.get('http://localhost:53000').then(res=>{
                //     console.log("000");
                // })
            }
        }
    }
    </script>