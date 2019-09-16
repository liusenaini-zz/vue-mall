<template>
  <div id="detail">
    <!-- 商品详情页组件封装 -->

    <!-- 封装导航栏组件 -->
    <detail-nav-bar/>
    
    <scroll ref="scrolldata">
    <!-- 封装轮播组件 -->
    <detail-swiper :topImages="topImages" />
    <!-- 封装商品组件 -->
    <detail-base-info :goods='goodsInfo'/>
    <!-- 封装店铺组件 -->
    <detail-shop-info :shop='shopInfo'/>
    <!-- 封装图片展示组件 -->
    <detail-images-info :detailInfo='detailInfo' @imageLoad='imageLoad'/>
    <!-- 封装参数展示组件 -->
    <detail-param-info :paramInfo='paramInfo'/>
    <!-- 封装评论展示组件 -->
    <detail-comment-info :commentInfo='commentInfo'/>

    </scroll>


  </div>
</template>

<script>
import DetailNavBar from "views/detail/chilComps/DetailNavBar.vue";
import DetailSwiper from "views/detail/chilComps/DetailSwiper.vue";
import DetailBaseInfo from "views/detail/chilComps/DetailBaseInfo.vue";
import DetailShopInfo from "views/detail/chilComps/DetailShopInfo.vue";
import DetailImagesInfo from "views/detail/chilComps/DetailImagesInfo.vue";
import DetailParamInfo from "views/detail/chilComps/DetailParamInfo.vue";
import DetailCommentInfo from "views/detail/chilComps/DetailCommentInfo.vue"

import { getDetail,Goods,Shop,ParamInfo} from "network/detail.js"; //引入请求文件
import Scroll from "components/common/scroll/Scroll.vue" 
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo:{},
      shopInfo:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo
  },
  created() {
     //接收GoodsListlitem组件传递过来的iid
     this.iid = this.$route.params.iid; 
     //通过iid拿到商品详情页数据
     getDetail(this.iid)
        .then(res => {
          const data = res.result
          console.log(data)
          //1、请求商品轮播图数据
          this.topImages = data.itemInfo.topImages;
          //2、利用创建class类，获取商品整合后信息
          this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          // console.log(this.goods)
          //3、还是利用创建class类，获取店铺信息
          this.shopInfo = new Shop(data.shopInfo)
          // console.log(this.shop)
          // 4、直接获取图片展示信息
          this.detailInfo = data.detailInfo
          // console.log(this.detailInfo)
          //5、利用创建class类，获取参数展示信息
          this.paramInfo = new ParamInfo(data.itemParams.info,data.itemParams.rule)
          // console.log(this.paramInfo)
          //6、直接获取评论信息
          if(data.rate.cRate != 0){
            this.commentInfo = data.rate.list[0]
            // console.log(this.commentInfo)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    
  methods: {
     imageLoad(){
       this.$refs.scrolldata.refresh()//解决图片上拉不展示全部图片问题
    }
  }
};
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 99;
  background: #fff;
  height: 100vh;
}

</style>