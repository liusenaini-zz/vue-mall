import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import FastClick from 'fastclick' //引入安装的fastclick
import VueLazyload from 'vue-lazyload'//引入安装的vue-lazyload
import store from './store/index.js'
import toast from './components/common/toast/index.js'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()//将一个Vue实例对象赋给原型对象上自己定义的$bus属性,利用中央事件完成跨组件传值。
Vue.use(toast)//使用自己封装的插件


//解决移动端300ms延迟问题
FastClick.attach(document.body)
//使用VueLazyload懒加载插件
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png'),//添加背景图
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
