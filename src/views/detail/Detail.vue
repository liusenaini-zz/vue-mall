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
    <!-- 封装商品详情页的推荐信息组件 组件复用-->
    <goods-list :goods='recommends'/>
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
import DetailCommentInfo from "views/detail/chilComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import { getDetail,Goods,Shop,ParamInfo,getRecommend} from "network/detail.js"; //引入请求文件
import Scroll from "components/common/scroll/Scroll.vue" 
import {itemListenerMixin} from "common/mixin.js"//引入混入文件
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
      commentInfo:{},
      recommends:[],
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
    DetailCommentInfo,
    GoodsList
  },
  created() {
     //接收GoodsListlitem组件传递过来的iid
     this.iid = this.$route.params.iid; 
     //通过iid拿到商品详情页数据
     getDetail(this.iid)
        .then(res => {
          const data = res.result
          // console.log(data)
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
     //获取商品详情页的推荐信息
     getRecommend().then(res =>{
     this.recommends=res.data.list
      //  console.log(res)
   })
},
   methods: {
     imageLoad(){
      this.$refs.scrolldata.refresh()//解决上部分图片上拉不展示全部图片问题 ,
      //不用防抖方法也行,让DetailImagesInfo组件将图片全部加载完发送一次事件过来。
    },
  },
  mounted(){
    // const refresh = debounce(this.$refs.scrolldata.refresh,500)//利用封装的防抖函数等一张一张的图片都加载完后在一起刷新
    //     this.itemImgListenter = ()=>{refresh()}
    //     this.$bus.$on('itemImageLoad',this.itemImgListenter)
    //因为Home组件跟本组件有公共的需求（等待goods-list组件推荐图片加载完后在一起刷新整个页面高度），
    //=》利用vue里的混入mixin将上面代码抽离到mixin.js文件里
    

  },
   mixins:[itemListenerMixin],//引入混入文件，利用文件里中央事件总线对goods-list子组件进行自定义事件监听及防抖操作。
  //利用destroyed销毁的时候取消对子组件的监控
  destroyed(){
     this.$bus.$off('itemImageLoad',this.itemImgListenter)
  },
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