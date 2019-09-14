import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()//在vue原型对象里添加一个$bus实例对象，利用中央事件完成跨组件传值。

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
