import {ADD_CONUT,ADD_GOOD} from './mutation-types.js' //引入此文件当要改变addCount、addGood等名字的时候可以直接去此文件修改即可
export default {
    //接收actions分发过来的数据
    //mutations唯一的目的就是修改state里的状态，mutations中的每个方法尽可能完成的事情比较简单
    [ADD_CONUT](state,stateitem){
        stateitem.count +=1
    },
    [ADD_GOOD](state,product){
        product.checked = true//为每个商品添加一个checked属性
        state.cartList.push(product)
        // console.log(product)
    }
}