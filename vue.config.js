module.exports = {
  configureWebpack: {
    resolve: {
      //vue.config.js文件里起别名，便于后期写文件路径。
      //别名如果用在dom对象的属性里就得加~，如src属性
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

