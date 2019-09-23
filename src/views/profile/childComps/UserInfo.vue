<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <svg class="privateImage-svg left">
         <img src=""/>
          <!-- <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use> -->
        </svg>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile">
              <!-- <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use> -->
            </svg>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right">
        <!-- <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use> -->
      </svg>
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: #1296db;
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 65px;
    height: 65px;
    border-radius: 33px;
    background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566222642748&di=3a69db264c867b67cc99c0b5debc17d4&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-97b15f7c4c09c0390d37e9e5243d8bad_b.jpg') ;
    background-repeat:no-repeat;
    background-size:100% 100%;
  }

  .left {
    float: left;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0px;
  }
</style>
