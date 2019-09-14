export function debounce(func,delay){//封装防抖动函数，用于多次图片加载或搜索框搜索内容
    let timer = null
    return function(...args){
      if(timer) clearTimeout(timer)
      timer = setTimeout(()=>{
        func.apply(this,args)//解读此行代码：相当于this.func，将args参数（指图片数组中的一张图片）传入func函数里
      },delay) 
    }
}