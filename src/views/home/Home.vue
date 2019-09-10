<template>
  <div id="home">
    <!-- 封装顶栏nav-bar父组件-->
    <nav-bar class="home-nav">
      <div slot="center">购物</div>
    </nav-bar>


    <!-- 封装scroll滚动组件 -->
    <scroll ref='scrolldata' :probeType='3' @scroll='getposition' :pullUpLoad='true' @pullingUp='loadMore'>
    <!--swiper 轮播图封装成组件-->
    <home-swiper :banners="banners" />
    <!-- 封装recommend组件 -->
    <recommend-view :recommends="recommends" />
    <!-- 封装feature-view组件 -->
    <feature-view />
    <!-- 封装tab-control组件 -->
    <tab-control  class="tab-control" :title="['流行','新款','精选']" @tabClick='gettabClick'/>
    <!-- 封装goods-list组件 -->
    <goods-list :goods="currentTypedata"/>
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
      isshowbacktop:false
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


  created() {
    //请求轮播和抢购数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop"); //发送不同的请求数据类型
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

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
    },
    backclick(){
          //native修饰符对整个组件进行事件监听 
          this.$refs.scrolldata.scrollTo(0,0,1000)//通过$refs拿到scroll组件里的scrollTo方法并传值
    },
    getposition(position){
       //拿到子组件传递过来的位置进行判断，是否显示隐藏箭头
        this.isshowbacktop = (-position.y>1000)? true : false
    },
    loadMore(){
      //调用getHomeGoods方法将currentType类型传入
      this.getHomeGoods(this.currentType)
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
             console.log(res.data)
            //  =>res请求回来的数据是第一页数据 type是pop page是第一页
             this.goods[type].list.push(...res.data.list)//将请求到每页的数据依次存储到list里，利用了数组解构，将数组里的元素一个一个的放入新数组里。
             this.goods[type].page += 1
             console.log(this.goods[type].list)

             //每上拉一次，就执行一次数据加载
             this.$refs.scrolldata.finishPullUp()
      });
    },

  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  position: relative;
  /* 视口高度 */
  height: 100vh;
}
.home-nav {
  background: #1296db;
  color: white;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  z-index: 9;
}
.tab-control {
  /* sticky用css简单完成吸顶效果 */
  position: sticky;
  top: 44px;
  background: #fff;
  z-index: 9;
}

</style>