<template>
  <div id="app">
    <!-- exclude将name名字为Detail的组件排除在缓存之外 避免从首页点击商品进入详情页数据不更新-->
    <keep-alive exclude="Detail" >
    <router-view/>
    </keep-alive>
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
