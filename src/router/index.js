import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import CreateUser from '../components/CreateUser'

Vue.use(VueRouter);

const routes = [
    { path: '/login', component: Login },
    { path: '/create', component: CreateUser }
]

export default new VueRouter({
    mode: "history",
    routes
})