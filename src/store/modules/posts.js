import api from "@/services/axiosApi";

export default {
    actions: {
        async fetchPosts({commit}, payload) {
            const response = await api.get('/posts', {
                params: {
                    ...payload,
                    limit: 0,
                }
            });
            commit('updatePosts', response.data);
        },
        async getPostByID({commit}, postID) {
            const response = await api.get('/posts/' + postID);
            commit('updatePostByID', response);
            // dispatch('getUserByID', response.postedBy);
        },
        async createPost(ctx, payload) {
            api.post('/posts', payload)
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