import Vue from 'vue'
import router from 'vue-router'

//路由懒加载
const Home =() => import('views/home/Home.vue')
const Category =() =>import('views/category/Category.vue')
const Shopcart =() =>import('views/shopcart/Shopcart.vue')
const Profile =() =>import('views/profile/Profile.vue')

Vue.use(router)
export default new router({
    routes: [
        {
            path:'',
            redirect:'/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/category',
            component: Category

        },  
        {
            path: '/shopcart',
            component: Shopcart
        },
        {
            path: '/profile',
            component: Profile
        }
    ]
})