<template>
  <swiper :options="swiperOption" class="swiper">
    <swiper-slide class="swiper-slide" v-for="(item,index) in topImages" :key="index">
      <img :src="item" width="100%" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
//引入轮播插件
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    props:{
        topImages:{
            type:Array,
            default(){
                return []
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
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.swiper{
  height: 270px;
}
.swiper-slide {
  overflow: hidden;
}

</style>