<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物</div>
    </nav-bar>
    <!--swiper 轮播图封装成组件-->
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue"//引入轮播子组件
import RecommendView from "./childComps/RecommendView.vue";

import { getHomeMultidata } from "network/home.js"; //引入用于请求的文件
export default {
  data() {
    return {
      banners:[],
      recommends:[]
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  }
};
</script>

<style scoped>
.home-nav {
  background: #1296db;
  color: white;
}

</style>