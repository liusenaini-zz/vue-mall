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
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
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
      pullUpLoad: this.pullUpLoad, //配置上拉刷新属性
      click: true //设置此属性使滑动组件里的内容可以点击
    });
    //监听时时滚动的位置
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
    //监听上拉加载事件，滚动到底部
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },

  methods: {
    scrollTo(x, y, time = 300) {
      //将this.scroll.scrollTo方法封装成srcollTo直接调用。
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      //上拉加载更多封装成pullingUp方法直接调用
      this.scroll.finishPullUp();
    },
    refresh() {
      // 调用方法前做一下判断
      this.scroll && this.scroll.refresh(); //调用scroll对象的refresh方法刷新scrollerHeight高度，解决上拉刷新scrollerHeight固定高度bug,bug让图片不能正常展示。
    },
    getscrollY(){
      return this.scroll ? this.scroll.y : 0
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