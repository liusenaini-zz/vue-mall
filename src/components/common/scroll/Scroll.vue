<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      }
    },
    pullUpLoad:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //创建srcoll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //$refs获取当前dom元素
      probeType: this.probeType,
      pullUpLoad:this.pullUpLoad,
      click: true //设置此属性使滑动组件里的内容可以点击
    });
    //监听时时滚动的位置
    this.scroll.on("scroll", (position) => {
      this.$emit('scroll',position)
    });
    //监听上拉加载事件
    this.scroll.on("pullingUp",()=>{
       this.$emit('pullingUp')
    })
  },

  methods: {
    scrollTo(x, y, time = 300) {
      //将this.scroll.scrollTo方法封装成srcollTo直接调用。
      this.scroll.scrollTo(x, y, time);
    },
   finishPullUp(){
      //将监听上拉加刷新封装成pullingUp方法直接调用
       this.scroll.finishPullUp()
    }
  }
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0px;
  right: 0px;
  bottom: 49px;
}
</style>