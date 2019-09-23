import Vue from 'vue'
import Vuex from 'vuex'
//使用插件
Vue.use(Vuex)
//创建一个store对象
// console.log(Vuex.Store instanceof Function)//true
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
    //     addCart(state, product) {
    //     //给商品添加count属性
    //     //方法一：
    //     //     let stateitem = null
    //     //     for (let item of state.cartList) {
    //     //         if (item.iid === product.iid) {//如果第二次添加的商品跟一开始添加的商品信息完全相同，那么就不需要重复添加了
    //     //             stateitem = item //将item商品赋给一个变量，便于给它添加count属性
    //     //         }
    //     //     }
    //     //     if (stateitem) {
    //     //         stateitem.count += 1 //cartList里找到了该商品就将该商品的count属性值加1
    //     //     } else {
    //     //         product.count = 1  
    //     //         state.cartList.push(product)//cartList里没找到该商品就将该商品添加进去并且添加count属性
    //     //     }
    //     //     console.log(state.cartList)
    //     // }
    //     //方法二：数组find函数：如果结果是true则返回的是遍历出来的item数据
    //     let stateitem = state.cartList.find(item=>item.iid===product.iid)//将item商品赋给一个变量，便于给它添加count属性
    //     if(stateitem){
    //         stateitem.count +=1
    //     }else{
    //         product.count = 1
    //         state.cartList.push(product)
    //     }
    //     console.log(state.cartList)
    //   },//如果把添加商品的数量和添加商品混在一起不好区分，用actions把两者分开
    
    //接收actions分发过来的数据
    //mutations唯一的目的就是修改state里的状态，mutations中的每个方法尽可能完成的事情比较简单
    addCount(state,stateitem){
        stateitem.count +=1
    },
    addGood(state,product){
        state.cartList.push(product)
    }
    },
    actions: {
       //通过actions将商品数量和商品分发到mutation，便于管理。
       addCart(context,product){
        let stateitem = context.state.cartList.find(item=>item.iid===product.iid)//将item商品赋给一个变量，便于给它添加count属性
            if(stateitem){
                // stateitem.count +=1
                context.commit('addCount',stateitem)
            }else{
                product.count = 1
                // context.state.cartList.push(product)
                context.commit('addGood',product)
            }
       }
    },
    getters: {

    },
    modules: {

    }
})

//暴露store对象，挂载到vue实例对象上
export default store