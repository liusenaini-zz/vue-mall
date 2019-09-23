<template>
  <div class="goods-item" @click="itemclick">
        <!-- load事件监听图片加载数量 -->
        <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
        <p>{{goodsitem.title}}</p>
        <span class="price">￥{{goodsitem.price}}</span>
        <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>
<script>
    export default {
        props:{
            goodsitem:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        data(){
            return{

            }
        },
        methods:{
          // imageLoad函数监控图片一张一张的加载
          imageLoad(){
            //根据路由判断给哪个父组件发送自定义事件，刷新页面。
            // if(this.$route.path.indexOf('/home')){
            //     this.$bus.$emit('itemImageLoad')
            // }else if(this.$route.path.indexOf('/detail')){
            //     this.$bus.$emit('itemImageLoad')
            // }
            //方法二，子组件发送自定义事件，所有的父组件里都需要监控自定义事件，
            //=>如果在父组件里引入混入文件，这样所有父组件都可以监控自定义事件了
            this.$bus.$emit('itemImageLoad')
           
          },
          itemclick(){
            this.$router.push('/detail/'+this.goodsitem.iid)//动态路由传值
          }
        },
        computed:{
          showImage(){
          //利用判断，切换图片数据在不同组件里的展示
          return this.goodsitem.image ? this.goodsitem.image : this.goodsitem.show.img
          }
        }
    }
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: skyblue;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>