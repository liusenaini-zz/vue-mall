<template>
  <div class="login">
    <div>
      <router-link :to="{path:'/home'}">登录</router-link>
      <login-bottom-bar/>
    </div>
  </div>
</template>

<script>
import LoginBottomBar from './LoginBottomBar'
export default {
   name:'login',
   components:{
     LoginBottomBar
   }
};
</script>

<style scoped>
.login{
  position: relative;
  height: 100vh;
}


</style>