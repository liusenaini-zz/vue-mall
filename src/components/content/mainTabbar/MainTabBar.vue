<template>
  <div>
    <!-- 组件化开发，封装tabbar组件 -->
    <tab-bar>
      <!-- 里层tab-bar-item组件的具名卡槽 -->
      <tab-bar-item path="/home" activecolor="#1296db">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" />
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activecolor="#1296db">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" />
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" />
        <div slot="item-text">商品</div>
      </tab-bar-item>
      <tab-bar-item path="/shopcart" activecolor="#1296db">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" />
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg"/>
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activecolor="#1296db">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" />
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg"/>
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/Tabbar.vue";
import TabBarItem from "components/common/tabbar/TabbarItem.vue";
export default {
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
</style>