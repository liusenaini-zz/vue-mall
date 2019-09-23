import Vue from 'vue'
import Vuex from 'vuex'
//使用插件
Vue.use(Vuex)
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
//创建一个store对象
// console.log(Vuex.Store instanceof Function)//true
var state =  {
    cartList: []
}
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    // getters: {

    // },
    modules: {

    }
})

//暴露store对象，挂载到vue实例对象上
export default store