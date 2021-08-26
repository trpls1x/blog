import axios from "axios";

export default {
    actions: {
        async fetchPosts({commit}) {
            const response = await axios.get('https://nodejs-test-api-blog.herokuapp.com/api/v1/posts')
            commit('updatePosts', response.data.data)
        },
        async getPostsByUserID({commit}, userID) {
            const response = await axios.get('https://nodejs-test-api-blog.herokuapp.com/api/v1/posts', {
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
        updatePostsByUserID(state, posts) {
            state.postsByUserID = posts
        }
    },
    state: {
        posts: [],
        postsByUserID: []
    },
    getters: {
        posts(state) {
            return state.posts
        },
        postsByUserID(state) {
            return state.postsByUserID
        }
    }
}