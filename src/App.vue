<template>
  <div id="app">
    <router-view/>
    <!-- 封装底栏main-tab-bar组件 -->
    <main-tab-bar/>
  </div>
</template>


<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
export default {
  components:{
    MainTabBar
  }
}
</script>
<style>
/* 引入的常用的css样式初始化 */
@import 'assets/css/base.css';
</style>
