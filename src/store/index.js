import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import users from './users'
import posts from './posts'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        users,
        posts
    }
})