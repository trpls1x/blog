import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth.js'
import users from '@/store/modules/users.js'
import posts from '@/store/modules/posts.js'
import comments from '@/store/modules/comments.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        users,
        posts,
        comments
    }
})