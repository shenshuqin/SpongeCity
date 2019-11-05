<template>
  <div class="app-container">
    <!--  顶部 start-->
    <app-header  v-if="header_show"></app-header>
<!--顶部end-->
    <!--    中间 -->
    <transition>
      <router-view v-on:header="header" v-on:footer="footer"></router-view>
    </transition>
    <app-footer v-if="footer_show"></app-footer>
  </div>
</template>

<script>
// 按需导入 Toast 组件
import AppHeader from './components/Header/header.vue'
import AppFooter from './components/Footer/footer.vue'
export default {
  data(){
    return {
      header_show:true,
      footer_show:true,
    }
  },
  components: {
    AppHeader,
    AppFooter
  },
  methods:{
  //是否显示头部
  header:function (bool) {
    this.header_show = bool;
  },
  //是否显示底部
  footer:function (bool) {
    this.footer_show = bool;
  }
}
}
</script>


<style>

</style>
