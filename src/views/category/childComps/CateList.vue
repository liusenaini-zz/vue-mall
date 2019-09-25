<template>
  <div>
    <scroll ref="scrolldata" class="content">
      <goods-list class="goods-list" :goods='currentTypedata' />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
export default {
  name:'CateList',
  props: ["category", "currentstring"],
  data() {
    return {
     
    };
  },
  components: {
    Scroll,
    GoodsList
  },
  computed: {
    currentTypedata() {
      //将对应的商品类型以数组的形式传给goodlist组件
      for(let i in this.category){
        // console.log( this.category[i].categoryDetail[this.currentstring])
        return this.category && this.currentstring ? this.category[i].categoryDetail[this.currentstring] : []  
      }
    }
  },
  created() {
   
  },
  mounted() {
    this.$refs.scrolldata.refresh();
  },
  methods: {}
};
</script>

<style scoped>
.content {
  background-color: #f6f6f6;
  top: 89px;
  left: 70px;
  flex: 1;
  position: fixed;
  bottom: 50px;
  width: 100%;
}
.goods-list {
  width: 82%;
}
</style>