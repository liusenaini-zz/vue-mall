<template>
  <div class="tab-control">
    <div
      class="tab-control-item" :class="{active:index === current}" v-for="(item,index) in title" :key="index"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      current: 0
    };
  },
  methods:{
    itemClick(index){
       this.current = index
       this.$emit('tabClick',this.current)
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: #1296db;
}
.active span {
  border-bottom: #1296db 2px solid;
  padding: 5px;
}
</style>