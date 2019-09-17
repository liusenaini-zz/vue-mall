<template>
  <div id="home">
    <!-- 封装顶栏nav-bar父组件-->
    <nav-bar class="home-nav">
      <div slot="center">购物</div>
    </nav-bar>
    <!-- 吸顶效果 -->
    <tab-control  ref='TabControl' :title="['流行','新款','精选']" @tabClick='gettabClick'  class="tab-control" v-show="isfixed"/>

    <!-- 封装scroll滚动组件 -->
    <scroll ref="scrolldata" :probeType='3' @scroll='getposition' :pullUpLoad='true' @pullingUp='loadMore'>
    <!--swiper 轮播图封装成组件-->
    <home-swiper :banners="banners" @swiperloadimg='swiperloadimg'/>
    <!-- 封装recommend组件 -->
    <recommend-view :recommends="recommends" />
    <!-- 封装feature-view组件 -->
    <feature-view />
    <!-- 封装tab-control组件 -->
    <tab-control  :title="['流行','新款','精选']" @tabClick='gettabClick' ref='tabControl'/>
    <!-- 封装goods-list组件 -->
    <goods-list :goods="currentTypedata" />
    </scroll>
    
    <!-- 封装回到顶部组件 -->
    <!-- native修饰符对整个组件进行事件监听 -->
    <back-top @click.native="backclick" v-show="isshowbacktop"/>
  </div>
</template>

<script>
//公共组件的导入
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue" 
import BackTop from "components/content/backTop/BackTop.vue"
//子组件的导入
import HomeSwiper from "./childComps/HomeSwiper.vue"; //引入轮播子组件
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
//其他文件的导入
import { getHomeMultidata, getHomeGoods } from "network/home.js"; //引入用于请求的文件
import {itemListenerMixin} from "common/mixin.js"//引入混入文件
export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        //数据模型保存请求回来的数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell:{ page: 0, list: [] },
      },
      currentType:'pop',
      isshowbacktop:false,
      tabOffsetTop:0,
      isfixed:false,
      saveY:0,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed:{
     currentTypedata(){
       //利用计算属性将goods-list里的goods[currentType].list简写
       return this.goods[this.currentType].list
     }
  },


  //当组件在 keep-alive内被切换时，
  //它的 activated（进入组件页面的钩子） 和 deactivated（离开组件页面的钩子）这两个生命周期钩子函数将会被对应执行。
  activated(){
      //从其它页面进入本页面时，保持原来的位置
      this.$refs.scrolldata.scrollTo(0,this.saveY,0)
      this.$refs.scrolldata.refresh()
  },
  deactivated(){
      //离开本页面时，记录当前位置
      this.saveY = this.$refs.scrolldata.getscrollY()
  },
  created() {
    //1、请求轮播和抢购数据
    this.getHomeMultidata();
    //2、请求商品数据
    this.getHomeGoods("pop"); //发送不同的请求数据类型
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted(){
     //监听item中图片加载数量完成后调用刷新方法
     //在mounted生命周期函数中使用 this.$refs.scroll而不是created中(bug)
     // const refresh = debounce(this.$refs.scrolldata.refresh,500)//利用封装的防抖函数等一张一张的图片都加载完后在一起刷新整个页面高度
    //  this.itemImgListenter = ()=>{refresh()}
    //  this.$bus.$on('itemImageLoad',this.itemImgListenter)//此处代码利用混入mixin抽离到了mixin.js文件 
    
  },
  mixins:[itemListenerMixin],





  methods: {
    /*子组件向父组件传递数据的事件监听方法 */
    gettabClick(data){
     switch (data){
       case 0:
         this.currentType = 'pop'
         break
       case 1:
         this.currentType = 'new'
         break
       case 2:
         this.currentType = 'sell'
         break
      }
      //拿到tabControl组件里的current属性，当点击是将date的值赋给两个current，统一点击状态
      this.$refs.TabControl.current = data
      this.$refs.tabControl.current = data
    },

    // 点击图标箭头回到顶部
    backclick(){
          //native修饰符对整个组件进行事件监听 
          this.$refs.scrolldata.scrollTo(0,0,1000)//通过$refs拿到scroll组件里的scrollTo方法并传值

    },

    //拿到子组件传递过来的滚动位置进行判断，是否显示隐藏箭头
    getposition(position){
      //1、判断是否返回顶部
        this.isshowbacktop = (-position.y>1000)? true : false
        //2、决定是否吸顶
        this.isfixed =  (-position.y) > this.tabOffsetTop
    },
    
    //加载更多
    loadMore(){
      //调用getHomeGoods方法将currentType类型传入
      this.getHomeGoods(this.currentType)
    },

    //监控一张轮播图是否加载完成,因为轮播图大不知道什么时候加载完成
    //当轮播图加载完成获取的this.$refs.tabControl.$el.offsetTop的值才是正确的。
    swiperloadimg(){
      //获取tab-control组件的offsetTop用于完成吸顶效果
      //所有的组件都有一个属性$el:用于获取组件中最外层div元素。
      //this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop//这里拿到的offsetTop不准确，只有轮播图加载完后才知道准确高度。
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },

  


   /*网络请求相关的封装方法*/
    //请求轮播和抢购数据的封装方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //请求商品数据的封装方法
    getHomeGoods(type) {
      //不要让页数硬编码
      const page = this.goods[type].page + 1//这里的type外加括号是将传入的string类型的'type'字符串转化为对象。
      getHomeGoods(type, page).then(res => {
            //  =>res请求回来的数据是第一页数据 type是pop page是第一页
             this.goods[type].list.push(...res.data.list)//将请求到每页的数据依次存储到list里，利用了数组解构，将数组里的元素一个一个的放入新数组里。
             this.goods[type].page += 1

             //每上拉一次，就执行一次数据加载刷新，如果不调用finishPullUp()方法页面不会在加载数据。
             this.$refs.scrolldata.finishPullUp()
      });
    },

  },
  
};
</script>

<style scoped>
#home {
  position: relative;
  /* 视口高度 */
  height: 100vh;
}
.home-nav {
  background: #1296db;
  color: white;
  top: 0px;
  right: 0px;
  left: 0px;
  z-index: 9;
}
/* .tab-control {
  /* sticky用css简单完成吸顶效果 */
  /* position: sticky;
  top: 44px;
  background: #fff;
  z-index: 9; 
} */
.tab-control{
  position: relative;
  z-index: 9;
  background: #fff;
}
</style>