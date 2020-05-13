<template>
  <div class="login">
    <div class="cloud_word">
      <div class="cloud">
        <img src="../../public/images/cloud01.png" alt />
        <img src="../../public/images/cloud02.png" alt />
      </div>
      <div class="title_sp">海绵城市登录系统</div>
    </div>
    <div class="login-wrap" action>
      <img class="avatar" src="../../public/images/default.png" />
      <div id="dmsg" class="alert alert-danger" style="display: none">
        <strong class="msg"></strong>
      </div>
      <div class="form-group">
        <label class="sr-only">用户名</label>
        <input
          v-model.trim="username"
          id="email"
          name="email"
          class="form-control"
          placeholder="用户名"
          autofocus
          value
        />
      </div>
      <div class="form-group">
        <label for="password" class="sr-only">密码</label>
        <input
          v-model.trim="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="密码"
          @keyup.enter="login"
        />
      </div>
      <div class="form-group">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
      </div>
      <button class="btn btn-primary btn-block" @click="login">登 录</button>
    </div>
  </div>
</template>
<script>
const Base64 = require("js-base64").Base64;
import { setCookie, getCookie } from "../../public/js/cookie.js";
import Api from "../../api/api";
import axios from "axios";
//跨域请求
axios.defaults.withCredentials = true;
//export default 指定模块的默认输出，一个模块只能有一个默认输出
export default {
  data() {
    // 使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件。
    return {
      username: "",
      password: "",
      checked: true
    };
  },
  created: function() {
    this.$emit("header", false);
    this.$emit("footer", false);
    // 在页面加载时从cookie获取登录信息
    let username = getCookie("username");
    let password = Base64.decode(getCookie("password"));
    // let password = getCookie("password");
    // console.log(getCookie("password"));
    let checked = getCookie("checked");
    // 如果存在赋值给表单，并且将记住密码勾选
    if (username) {
      this.username = username;
      this.password = password;
      this.checked = true;
    }
  },
  mounted() {},
  methods: {
    login() {
      var _this = this;
      var md5Pswd = this.$md5(this.password).toLocaleUpperCase(); // 将密码进行MD5加密
      var data = {
        username: this.username,
        password: md5Pswd
      };
      // axios({
      //     url: 'http://121.199.42.23:8080/sponge/user/login',
      //     method:'post',
      //     dataType: 'json',
      //     //发送格式为json
      //     data:data,
      //     headers:
      //        {
      //          'Content-Type': 'application/json'
      //        }
      // }).then(res => {
      //     if(res.data.status === 1){
      //         setCookie("token",res.data.data[0].token);
      //         $(".msg").text("登录成功!");
      //         _this.$router.push({path:'/home'})
      //         this.setUserInfo();
      //     }else{
      //         console.log("失败");
      //         $("#dmsg").css("display","block").addClass("shake animated");
      //         $(".msg").text("用户名或密码错误!")
      //     }

      // }).catch(err => {
      //     console.log(err);
      // });
      Api.login(data)
        .then(res => {
          if (res.data.status === 1) {
            setCookie("token", res.data.data[0].token);
            $(".msg").text("登录成功!");
            _this.$router.push({ path: "/home" });
            this.setUserInfo();
          } else {
            console.log("失败");
            $("#dmsg")
              .css("display", "block")
              .addClass("shake animated");
            $(".msg").text("用户名或密码错误!");
          }
        })
        .catch(err => {});
    },
    //存储用户信息
    setUserInfo: function() {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if (this.checked) {
        console.log(this.password);
        setCookie("username", this.username, 7);
        // base64加密密码
        let password = Base64.encode(this.password);
        setCookie("password", password, 7);
        // console.log(password);
        // setCookie("password",this.password,7)
      } else {
        setCookie("username", "");
        setCookie("password", "");
      }
    }
  }
};
</script>
