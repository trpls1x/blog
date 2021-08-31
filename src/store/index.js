import Vue from 'vue'
import Vuex from 'vuex'
import loading from '@/store/modules/loading'
import auth from '@/store/modules/auth'
import users from '@/store/modules/users'
import posts from '@/store/modules/posts'
import comments from '@/store/modules/comments'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        users,
        posts,
        comments,
        loading
    }
})