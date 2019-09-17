import {debounce} from './utils.js'
export const itemListenerMixin = {
    //mixin不仅可以混入mounted还可以混入data、计算属性、等等。。。
    mounted(){
        let refresh = debounce(this.$refs.scrolldata.refresh,500)//利用封装的防抖函数等一张一张的图片都加载完后在一起刷新
        this.itemImgListenter = ()=>{
              refresh()
        }
       
        this.$bus.$on('itemImageLoad',this.itemImgListenter)//第二个参数是一个回调函数
        console.log('我是混入的内容')
    },
    data(){
        return{
            itemImgListenter:null,
        }
    }
}