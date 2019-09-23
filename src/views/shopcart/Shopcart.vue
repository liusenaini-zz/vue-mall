<template>
  <div class="cart">
      <!-- 导航组件引入 -->
      <nav-bar class="nav">
          <div slot="center">购物车({{length}})</div>
      </nav-bar>
      <!-- 商品列表组件封装 -->
      <scroll class="content" ref="scrolldata">
        <!-- 单个加入购物车商品组件封装 -->
        <cart-list />
      </scroll>
      <!-- 底部汇总组件封装 -->
      <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import CartList from "./childComps/CartList.vue"
import CartBottomBar from "./childComps/CartBottomBar.vue"

//想用vuex里getter属性里任何一个方法，可以利用mapGetters将getter里的所有方法都拿到，在拿到组件里来使用
import {mapGetters} from "vuex"
export default {
 components:{
   NavBar,
   Scroll,
  CartList,
  CartBottomBar
  },
 computed:{
    //拿到getter属性里的方法的新方法。
    //  cartLength(){
    //     return this.$store.getters.cartLength
    //  }
    //两种语法都可以，、数组语法、对象语法
    // ...mapGetters(['cartLength']),//将getter里的方法存入到数组里
    ...mapGetters({
        length:'cartLength'//将getter里的方法映射到自定义的length属性
    })
 },
 activated() {
    this.$refs.scrolldata.refresh(); //一进入购物车页面就刷新一下
  }

};
</script>

<style scoped>
.cart{
  position: relative;
  height: 100vh;
}
.nav{
  background-color: #1296db;
  color: white;
}
.content{
  bottom: 92px;
}

</style>