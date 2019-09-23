<template>
  <div>
    <nav-bar>
        <div slot="left" class="back" @click="back">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
      <div slot="center" class="title">
        <div
          class="item"
          v-for="(item,index) in titles"
          :key="index"
          :class="{active:index===current}"
          @click="itemclick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  data() {
    return {
      titles: ["商品", "详情", "评论", "推荐"],
      current: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    itemclick(index) {
        this.$emit('themclick',index)
    },
    back(){
        this.$router.back()    
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
}
.item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: #1296db;
}
.back{
   margin-top: 5px;
}
</style>