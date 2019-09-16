import {request} from './request.js'
export function getDetail(iid){
   return request({
       url:'/detail',
       params:{
          iid
       }
   })
}




//抽取商品详情页数据，通过ES6中的class创建类(对ES6 的类来说，完全可以看作构造函数的另一种写法)加以整合,拿到我们想要的数据。
export class Goods{
    constructor(itemInfo,columns,services){
       this.title = itemInfo.title
       this.desc = itemInfo.desc
       this.newPrice = itemInfo.price
       this.discount = itemInfo.discountDesc
       this.columns = columns
       this.services = services
       this.realPrice = itemInfo.lowNowPrice
    }      
}


//用上面方法整合店铺数据
export class Shop{
   constructor(shopInfo){
         this.logo = shopInfo.shopLogo
         this.name = shopInfo.name
         this.fans = shopInfo.cFans
         this.sells = shopInfo.cSells
         this.score = shopInfo.score
         this.goodsCount = shopInfo.cGoods
   }
}

//用上面方法整合参数展示信息
export class ParamInfo{
   constructor(info,rule){
      //某些是商品的参数照片没有，需做一个判断
      this.image = info.images ? info.images[0] : ''
      this.infos = info.set
      this.sizes = rule.tables
   }
}