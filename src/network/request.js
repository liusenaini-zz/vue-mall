import axios from 'axios'
//封装request哪个组件要用直接调用
//将axios封装进request，好处：以后要更换axios框架时，只用修改此文件就行，其它文件的请求代码不用改。
export function request(config){
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000/api/v1',
        timeout:5000
    })
    //请求拦截
   instance.interceptors.request.use(req =>{
       return req
   },err =>{
      // console.log(err)
   })
   //响应拦截
   instance.interceptors.response.use(res =>{
       return res.data
   },err=>{
       console.log(err)
   })

   //发送真正的请求 
   return instance(config)//返回一个promise
}