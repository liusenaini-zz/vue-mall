<template>
  <div class="recommend">
    <swiper :options="swiperOption">
      <swiper-slide class="recommend-item" v-for="(item,index) in recommends" :key="index">
        <a :href="item.link">
          <img :src="item.image" width="100%" />
          <div>{{item.title}}</div>
        </a>
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
        slidesPerView: 4 //设置swiper插件的每个页面展示3个图片。
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
  font-size: 13px;
  padding: 3px 0px 3px 0px;
  border-bottom: 8px solid #eee;
}

.swiper-container {
  width: 100%;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}
</style>