import axios from "axios"
const apiUrl = process.env.VUE_APP_API_URL
const apiPrefix = process.env.VUE_APP_API_PREFIX

export default {
    actions: {
        async fetchPosts({commit}) {
            const response = await axios.get(apiUrl + apiPrefix + '/posts', {
                params: {
                    limit: null
                }
            })
            commit('updatePosts', response.data.data)
        },
        async getPostByID({commit, dispatch}, postID) {
            const response = await axios.get(apiUrl + apiPrefix + '/posts/' + postID);
            commit('updatePostByID', response.data);
            dispatch('getUserByID', response.data.postedBy)
        },
        async getPostsByUserID({commit}, userID) {
            const response = await axios.get(apiUrl + apiPrefix + '/posts', {
                params: {
                    postedBy: userID,
                    limit: 0
                }
            })
            commit('updatePostsByUserID', response.data.data)
        }
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts
        },
        updatePostByID(state, post) {
            state.postByID = post
        },
        updatePostsByUserID(state, posts) {
            state.postsByUserID = posts
        }
    },
    state: {
        posts: [],
        postByID: {},
        postsByUserID: []
    },
    getters: {
        posts(state) {
            return state.posts
        },
        postByID(state) {
            return state.postByID
        },
        postsByUserID(state) {
            return state.postsByUserID
        }
    }
}