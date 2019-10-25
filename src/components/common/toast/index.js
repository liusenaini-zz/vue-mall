import Toast from './Toast.vue' 
var obj = {}
obj.install = function(Vue){
//    document.body.appendChild(Toast.$el)//将Toast组件对象的html代码添加到body里,这里dom元素还没挂载，所以获取不到组件里的代码
//1、创建组件构造器
//console.log(typeof Vue.extend)//function 是一个构造函数
const toastF = Vue.extend(Toast)

//2、new接一个构造函数创建出一个组件实例对象
const toast =  new toastF()

//3、将组件对象，手动挂载到某一个元素上
toast.$mount(document.createElement('div'))

//4、toast.$el对应的就是div，在把div元素添加到body里
document.body.appendChild(toast.$el)

Vue.prototype.$toast = toast//将Toast组件对象赋给原型对象上自己定义的$toast属性
}

export default obj