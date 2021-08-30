import axios from "axios"
const apiUrl = process.env.VUE_APP_API_URL
const apiPrefix = process.env.VUE_APP_API_PREFIX

export default {
    actions: {
        async fetchPosts({commit}, payload) {
            const response = await axios.get(apiUrl + apiPrefix + '/posts', {params: payload})
            commit('updatePosts', response.data.data)
        },
        async getPostByID({commit, dispatch}, postID) {
            const response = await axios.get(apiUrl + apiPrefix + '/posts/' + postID);
            commit('updatePostByID', response.data);
            dispatch('getUserByID', response.data.postedBy)
        },
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts
        },
        updatePostByID(state, post) {
            state.postByID = post
        },
    },
    state: {
        posts: [],
        postByID: {}
    },
    getters: {
        posts(state) {
            return state.posts
        },
        postByID(state) {
            return state.postByID
        }
    }
}