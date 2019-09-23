import { debounce } from './utils.js'
//混入防抖
export const itemListenerMixin = {
    //mixin不仅可以混入mounted还可以混入data、计算属性、等等。。。将各组件相同部分提取出来。
    mounted() {
        let refresh = debounce(this.$refs.scrolldata.refresh, 500)//利用封装的防抖函数等一张一张的图片都加载完后在一起刷新
        this.itemImgListenter = () => {
            refresh()
        }

        this.$bus.$on('itemImageLoad', this.itemImgListenter)//第二个参数是一个回调函数
        console.log('我是混入的内容')
    },
    data() {
        return {
            itemImgListenter: null,
        }
    },
}

//混入箭头图标回顶部内容
export const backTopMixin = {
    data(){
        return{
            isshowbacktop:false,//用于判断图标是否显示出来的标识
        }
    },
    methods: {
        // 当图标箭头显示出来后点击图标箭头回到顶部
        backclick() {
            //native修饰符对整个组件进行事件监听 
            this.$refs.scrolldata.scrollTo(0, 0, 1000)//通过$refs拿到scroll组件里的scrollTo方法并传值

        },
         //拿到子组件传递过来的滚动位置进行判断，是否显示隐藏箭头
        ListenterBackTop(position){
            //1、判断图标箭头是否显示出来
            this.isshowbacktop = (-position.y>1000)? true : false
        },
        
    }
}