import Vue from 'vue'
import VueRouter from 'vue-router'
import Card from '@/components/Card'
import Login from '@/views/V-Login'
import Register from '@/views/V-Register'
import MainPage from '@/components/MainPage'
import Feed from '@/views/V-Feed'
import UserProfile from '@/views/V-UserProfile'
import Post from '@/views/V-Post'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: MainPage, children: [{path: '', name: 'main', component: Feed}] },
    { path: '/login', component: Card, children: [{ path: '', name: 'login', component: Login }] },
    { path: '/register', component: Card, children: [{path: '', name: 'register', component: Register}] },
    { path: '/users/:id', component: MainPage, children: [{path: '', name: 'user', component: UserProfile}] },
    { path: '/posts/:id', component: MainPage, children: [{path: '', name: 'post', component: Post}] }
]

export default new VueRouter({
    mode: "history",
    routes
})