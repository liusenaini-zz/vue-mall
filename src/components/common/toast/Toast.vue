<template>
  <div class="toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
//   props: {
//     message: {
//       type: String,
//       default: ""
//     },
//     isshow:{
//         type:Boolean,
//         default:false
//     }
//   },
  data() {
    return {
       message:'',
       isshow:false
    };
  },
  methods:{
      //封装好show方法，等待需要用其功能的组件调用它
      show(message='默认文字',duration='1500'){
          this.isshow = true;
          this.message = message
          setTimeout(()=>{
              this.isshow = false   
              this.message = ''
          },duration)
      }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 99;
  font-size: 16px;
  border-radius: 8px;

}
</style>