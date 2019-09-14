<template>
  <div class="swiper-area">
    <swiper :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(item,index) in banners" :key="index">
        <img :src="item.image" width="100%" @load="loadimg"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
//引入轮播插件
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return []; //默认返回空数组
      }
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination", //配置点
          clickable: true //配置点击哪个点跳到哪个点
        }
      },
      isload:false
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  methods:{
    loadimg(){
      if(!this.isload){
        //利用isload可以只监控一张轮播图是否加载完成
        this.$emit('swiperloadimg')
        this.isload = true
      }
    }
  }
};
</script>

<style scoped>
.swiper-slide {
  overflow: hidden;
}
.swiper-slide img {
  max-height: 20rem;
}
</style>