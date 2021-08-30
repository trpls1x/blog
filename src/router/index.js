import Vue from 'vue'
import VueRouter from 'vue-router'
import Card from '@/components/Card'
import Login from '@/views/V-Login'
import Register from '@/views/V-Register'
import MainPage from '@/components/MainPage'
import Posts from '@/views/V-Posts'
import Users from '@/views/V-Users'
import Post from '@/views/V-Post'
import UserProfile from '@/views/V-UserProfile'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/posts'},
    { path: '/login', component: Card, children: [{ path: '', name: 'login', component: Login }] },
    { path: '/register', component: Card, children: [{path: '', name: 'register', component: Register}] },
    { path: '/posts', component: MainPage, children: [{path: '', name: 'posts', component: Posts}] },
    { path: '/posts/:id', component: MainPage, children: [{path: '', name: 'post', component: Post}] },
    { path: '/users', component: MainPage, children: [{path: '', name: 'users', component: Users}] },
    { path: '/users/:id', component: MainPage, children: [{path: '', name: 'user', component: UserProfile}] },
]

export default new VueRouter({
    mode: "history",
    routes
})