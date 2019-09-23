<template>
  <div class="bottom-menu">
    <check-button class="select-all" :ischecked='isallchecked'  @click.native="allcheckedbutton"/>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}} 总数:{{checkLength}}</span>
    <span class="buy-product">点击购买</span>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  computed: {
    totalPrice() {
      //两个高阶函数的运用
      return this.$store.state.cartList
        .filter(item => item.checked === true) //高阶过滤函数，过滤出选中的商品
        .reduce((prevalue, item) => prevalue + item.price * item.count, 0) //将选中的商品在进行一次汇总，prevalue默认数值0
        .toFixed(2); //保留2位小数
    },
    checkLength() {
          return this.$store.state.cartList.filter(item => item.checked === true).length;
    },


    //设置全选按钮两步
    //1、显示状态，当所有商品都选中时全选按钮选中，当有一个不选中时全选按钮不选中
    isallchecked() {
          //显示状态
          // 方法一
          // 考虑没有商品的情况下
          if(this.$store.state.cartList.length){
              return !this.$store.state.cartList.find(item => item.checked === false)//find函数：当找到时返回true
          }
          //方法二
          // return !(this.$store.state.cartList.filter(item => item.checked === false).length)//利用过滤出不选中的商品长度取否
    }
  },
  methods:{
     //2、点击全选按钮
     //在分为2种情况，1、当商品全部选中时，点击全选按钮，商品按钮和全选按钮都不选中
     //2、当某些商品没选中时，点击全选按钮都选中
    allcheckedbutton(){
        if(this.isallchecked){//第一种情况，当商品全部选中时
            this.$store.state.cartList.forEach(item =>item.checked = false);
        }else{//第二种情况，当某些商品或所有商品没选中时
            this.$store.state.cartList.forEach(item =>item.checked = true);
        }
       
    }

  },
  components: {
    CheckButton
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 40px;
  background-color: #eee;
  position: absolute;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0px;
  left: 12px;
  top: 11px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: black;
}

.bottom-menu .buy-product {
  background-color: #1296db;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>