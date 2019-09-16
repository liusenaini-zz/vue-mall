export function debounce(func,delay){//封装防抖动函数，用于多次图片加载或搜索框搜索内容
    let timer = null
    return function(...args){
      if(timer) clearTimeout(timer)
      timer = setTimeout(()=>{
        func.apply(this,args)//解读此行代码：相当于this.func，将args参数（指图片数组中的一张图片）传入func函数里
      },delay) 
    }
}


//封装formatDate函数，将date进行格式化，转成字符串，完成对时间戳的转化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};