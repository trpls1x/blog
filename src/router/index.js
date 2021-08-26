import Vue from 'vue'
import VueRouter from 'vue-router'
import Card from '../components/Card'
import Login from '../views/Login'
import Register from '../views/Register'
import MainPage from '../components/MainPage'
import Feed from '../views/Feed'
import User from '../views/User'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: MainPage, children: [{path: '', component: Feed}] },
    { path: '/login', component: Card, children: [{ path: '', component: Login }] },
    { path: '/register', component: Card, children: [{path: '', component: Register}] },
    { path: '/users/:id', component: MainPage, children: [{path: '', component: User}] }
]

export default new VueRouter({
    mode: "history",
    routes
})