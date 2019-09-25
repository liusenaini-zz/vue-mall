<template>
  <div class="category">
    <!-- 导航组件引入 -->
    <nav-bar class="nav">
      <div slot="center">商品列表</div>
    </nav-bar>
    <tab-control class="tab-control" :title="['流行','新款','精选']" @tabClick="gettabClick"/>
   
    <div class="content">
      <!-- 封装左侧栏菜单组件 -->
      <cate-tab-menu :categories="categories" @selectItem="selectItem" />
    </div>
    
    <div class="subcontent">
      <cate-list :category='categoryData' :currentstring="currentType"/>
    </div>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import CateTabMenu from "./childComps/CateTabMenu.vue";
import CateList from "./childComps/CateList.vue";

import {getCategory, getCategoryDetail,getSubcategory} from "network/category.js"; //引入请求文件
export default {
  components: {
    NavBar,
    CateTabMenu,
    CateList,
    TabControl
  },
  data() {
    return {
      categories: [],
      categoryData: [],
      currentIndex: 0,
      subcategories: {},
      currentType:'pop',
    };
  },
  created() {
    this.getCategory();
  },
  mounted(){
    // console.log(this.currentType)
  },
  methods: {
    //封装左侧栏请求
    getCategory() {
      getCategory().then(res => {
        this.categories = res.data.category.list;
        // console.log(this.categories);
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          //按照this.categories.length的数组长度遍历得到对应的索引值，然后创建一个新的categoryData数组
          //=>在将 subcategories、 categoryDetail属性以对象的形式存入该数值，形成一个新的categoryData数据数组
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          };
        }
        // console.log(this.categoryData)
        // 3.请求第一个分类的数据，默认正在流行数据展示
           this.getSubcategories(0);
      });
    },
    //封装getSubcategories方法用做点击获取左侧栏对应的数据
    getSubcategories(index) {
      //index==0
      this.currentIndex = index; //把点击的下标保存起来
      const mailKey = this.categories[index].maitKey; //把maitKey保存起来 maitkey == 3627
      getSubcategory(mailKey).then(res => {
        //通过根据左侧栏的mailKey的值请求左侧栏对应的数据
        // console.log(res.data)//拿到maitkey == 3627的对象数据
        this.categoryData[index].subcategories = res.data; //将拿到对象数据存入subcategories对象里
        this.subcategories = this.categoryData[index].subcategories;

        // this.categoryData = { ...this.categoryData };//此处没看懂
        // console.log(this.categoryData)
        this.getCategoryDetail('pop');
        this.getCategoryDetail('sell');
        this.getCategoryDetail('new');
      });
    },
   // 封装getCategoryDetail方法用做请求右侧栏type类型
    getCategoryDetail(type) {//假设type是'pop'时
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => { //根据type类型获取右侧栏
        // 3.将获取的数据保存下来
        // console.log(res)
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
        // console.log(this.categoryData)//Object
      });
    },
    selectItem(index) {
      this.getSubcategories(index);
    },

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
      //解决吸顶栏点击时标题样式不变的bug
      //拿到tabControl组件里的current属性，当点击是将date的值赋给两个current，统一点击状态
      // this.$refs.TabControl.current = data
      // this.$refs.tabControl.current = data
  }
  },
 computed:{
     
  },

};
</script>

<style scoped>
.category {
  position: relative;
  height: 100vh;
}
.nav {
  background-color: #1296db;
  color: white;
}
.tab-control {
  position: fixed;
  width: 85%;
  height: 45px;
  left: 70px;
  top: 46px;
  z-index: 9;
}
</style>