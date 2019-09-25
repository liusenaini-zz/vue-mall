<template>
  <div class="goods">
    <!-- 循环遍历goods-list-item组件 -->
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsitem="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  },
  created() {
    // console.log(this.goods)
  },
 
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>