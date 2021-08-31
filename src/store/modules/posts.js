import axios from "axios"
const apiUrl = process.env.VUE_APP_API_URL
const apiPrefix = process.env.VUE_APP_API_PREFIX

export default {
    actions: {
        async fetchPosts({commit}, payload) {
            try {
                
                const response = await axios.get(apiUrl + apiPrefix + '/posts', {
                    params: {
                        ...payload,
                        limit: 0,
                    }
                });
                commit('updatePosts', response.data.data);
            } catch(e) {
                console.log(e);
            }
        },
        async getPostByID({commit, dispatch}, postID) {
            try {
                const response = await axios.get(apiUrl + apiPrefix + '/posts/' + postID);
                commit('updatePostByID', response.data);
                dispatch('getUserByID', response.data.postedBy);
            } catch(e) {
                console.log(e);
            }
        },
        async createPost(ctx, payload) {
            try {
                axios.post(apiUrl + apiPrefix + '/posts', payload)
            } catch (e) {
                console.log(e);
            }
        }
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
        posts: state => state.posts,
        postByID: state => state.postByID
    }
}