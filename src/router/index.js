import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Shopcart = () => import('views/shopcart/Shopcart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Detail = () => import('views/detail/Detail.vue')
const Login = () => import('views/login/Login.vue')


Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '',
            redirect: '/home'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/category',
            name: 'category',
            component: Category

        },
        {
            path: '/shopcart',
            name: 'shopcart',
            component: Shopcart
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/detail/:iid',//动态路由传值
            name: 'detail',
            component: Detail
        },
        {
            path: '**',  // 错误路由
            redirect: '/home'  //重定向
        }
    ]
})


export default router

