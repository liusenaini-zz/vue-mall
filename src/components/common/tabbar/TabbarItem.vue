<template>
  <div class="tab-bar-item" @click="change">
    <div v-if='!isflag'> <slot name="item-icon"></slot></div>
    <div v-else> <slot name="item-icon-active"></slot></div>
    <div :style="isActive"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  props:{
      path:'',
      activecolor:{
        type:String,
        default:'red'
      }
  },
  data(){
    return{
      
    }
  },
  computed:{
    isflag(){
      //this.$route.path是当前活跃的路由     this.path是从父组件传递过来的属性值组成的数组
      return this.$route.path.indexOf(this.path) !== -1 //找到了返回当前索引值,值肯定大于0，没找到返回-1
    },
    isActive(){
          return this.isflag ? {color:this.activecolor} : {}
    }
  },
  methods:{
    change(){
      this.$router.replace(this.path)
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
 .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>