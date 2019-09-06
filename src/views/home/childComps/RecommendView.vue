<template>
  <div class="recommend">
    <swiper :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(item,index) in recommends" :key="index">
        <div class="recommend-item">
          <a :href="item.link">
            <img :src="item.image" width="100%" />
            <div>{{item.title}}</div>
          </a>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3 //设置swiper插件的每个页面展示3个图片。
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
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 5px 0px 5px;
  border-bottom: 10px solid #eee;
}
.recommend-item img {
  width: 90px;
  height: 90px;
  margin-bottom: 10px;
}
</style>