module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      //高清屏1点等于2个像素，iPhone6（750x1334）
      viewportWidth:375,//视口宽度，对应设计稿的宽度
      viewportHeight:667,//视口高度，对应设计稿的高度
      unitPrecision: 5,//指定‘px’转化为视口值得小数位位数（可以不配置）
      viewportUnit: 'vw',//指定需要转化成的视口单位，最好使用vm
      selectorBlackList: ['tab-control','tab-bar-item'],//指定不需要转化的组件名
      minPixelValue: 1,//小于或等于‘1px’不转化为视口单位
      mediaQuery: false,//允许在媒体查询中装换‘px’
      exclude:[/TabBar/]//必须正则
    }
  }
}
