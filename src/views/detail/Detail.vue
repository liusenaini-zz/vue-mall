<template>
  <div id="detail">
    <!-- 商品详情页组件封装 -->

    <!-- 封装导航栏组件 -->
    <detail-nav-bar @themclick='themclick' ref="nav"/>

    <scroll ref="scrolldata" :probeType='3' @scroll='getposition'>
    <!-- 封装轮播组件 -->
    <detail-swiper :topImages="topImages" />
    <!-- 封装商品组件 -->
    <detail-base-info  :goods='goodsInfo'/>
    <!-- 封装店铺组件 -->
    <detail-shop-info :shop='shopInfo'/>
    <!-- 封装图片展示组件 -->
    <detail-images-info ref='params' :detailInfo='detailInfo' @imageLoad='imageLoad'/>
    <!-- 封装参数展示组件 -->
    <detail-param-info  :paramInfo='paramInfo'/>
    <!-- 封装评论展示组件 -->
    <detail-comment-info ref='comment' :commentInfo='commentInfo'/>
    <!-- 封装商品详情页的推荐信息组件 组件复用-->
    <goods-list ref='recommend' :goods='recommends'/>
    </scroll>

    <!-- 封装底部栏组件 -->
    <detail-bottom-bar @addToCart='addCart'/>
    <!-- 封住回顶部箭头图标组件 -->
    <back-top @click.native="backclick" v-show="isshowbacktop"/>
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
import DetailBottomBar from "views/detail/chilComps/DetailBottomBar.vue"

import { getDetail,Goods,Shop,ParamInfo,getRecommend} from "network/detail.js"; //引入请求文件
import Scroll from "components/common/scroll/Scroll.vue" 
import {itemListenerMixin,backTopMixin} from "common/mixin.js"//引入混入文件
import BackTop from "components/content/backTop/BackTop.vue"
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
      themTopYs:[],
      currentIndex:0
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
    GoodsList,
    DetailBottomBar,
    BackTop
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
      
      //等监控的图片都加载完了，在获取各主题对应的offsetTop值，不然获取的值不准确，将值push进themTopYs数组存放
      //这里不用防抖函数也行，因为已经在DetailImagesInfo组件里处理过监控图片全部加载完的问题了。
       this.themTopYs = []
       this.themTopYs.push(0)
       this.themTopYs.push(this.$refs.params.$el.offsetTop)
       this.themTopYs.push(this.$refs.comment.$el.offsetTop)
       this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
      //  this.themTopYs.push(Number.MAX_VALUE)//hack方法
       
    },
    //点击不同的主题得到高度然后对应不同的展示。
    themclick(data){
          this.$refs.scrolldata.scrollTo(0,-this.themTopYs[data],100)
      },
    //当页面滑动到哪个具体位置时，主题要对应切换
     getposition(position){
       //[0, 704, 6873, 7200]
      // 滑动位置-position.y跟主题具体位置的区间作比较
      let length = this.themTopYs.length
      for(let i=0;i<length;i++){
       //-position.y  0到704之间，i= 0
       //-position.y  =704到6873之间 i = 1
       //-position.y  6873到7200之间  i = 2

       //-position.y  7200到js的最大值Number.MAX_VALUE之间 i = 3//hack方法更好用（这里用普通方法）

       //如何获取-position.y  大于等于7200之后  i = ？  //在if判断的时候把判断分成两层或者用hack方法往this.themTopYs数组里添加一个js的最大值Number.MAX_VALUE
       //普通方法：
        if(this.currentIndex !== i && //此条件可以让i不重复输出
          (
          (i < length-1 && (this.themTopYs[i]<=-position.y && -position.y<this.themTopYs[i+1]))||
          (i===length-1 && (this.themTopYs[i]<=-position.y))
          )
        )
        {
            this.currentIndex = i
            // console.log(this.currentIndex)
            this.$refs.nav.current = this.currentIndex
        }
        //hack方法：往this.themTopYs数组里添加一个js的最大值Number.MAX_VALUE
        // if(this.currentIndex !== i && 
        //   (this.themTopYs[i]<=-position.y && -position.y<this.themTopYs[i+1])){
        //           this.currentIndex = i
        //           this.$refs.nav.current = this.currentIndex
        //  }
        
      }

       //判断图标箭头是否显示出来
       this.ListenterBackTop(position)
     },

    //添加到购物车
    addCart(){
     //1.获取购物车需要展示的信息
     var product = {}
     product.image = this.topImages[0]
     product.title = this.goodsInfo.title
     product.desc = this.goodsInfo.desc
     product.price = this.goodsInfo.realPrice
     product.iid = this.iid
     //console.log(product)
     //2.将商品信息添加到购物车页面(利用vuex)
     this.$store.dispatch('addCart',product)
    }
  },
  mounted(){
    // const refresh = debounce(this.$refs.scrolldata.refresh,500)//利用封装的防抖函数等一张一张的图片都加载完后在一起刷新
    //     this.itemImgListenter = ()=>{refresh()}
    //     this.$bus.$on('itemImageLoad',this.itemImgListenter)
    //因为Home组件跟本组件有公共的需求（等待goods-list组件推荐图片加载完后在一起刷新整个页面高度），
    //=》利用vue里的混入mixin将上面代码抽离到mixin.js文件里
    
    //当滑动到哪个具体位置时，主题要对应切换
    // console.log(this.$refs.scrolldata.getscrollY())

  },
   mixins:[itemListenerMixin,backTopMixin],//引入混入文件，利用文件里中央事件总线对goods-list子组件进行自定义事件监听及防抖操作。
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