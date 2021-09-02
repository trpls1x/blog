import api from "@/services/axiosApi";

export default {
    actions: {
        async fetchPosts({commit, getters}, payload) {
            const response = await api.get('/posts', { 
                params: {
                    limit: getters.postsPagination.limit,
                    ...payload,
                } 
            });
            commit('updateTotalPosts', response.pagination.total)
            commit('updatePosts', response.data);
        },
        async getPostByID({commit}, postID) {
            const response = await api.get('/posts/' + postID);
            commit('updatePostByID', response);
        },
        async createPost(ctx, payload) {
            await api.post('/posts', payload)
        },
        async putLike(ctx, postID) {
            await api.put('/posts/like/' + postID)
        },
        // checkLike({commit, getters}, post) {
        //     post.likes.forEach((element) => {
        //         if(element == getters.accountData._id) {

        //         }
        //     })
        // }
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts
        },
        updatePostByID(state, post) {
            state.postByID = post
        },
        updateTotalPosts(state, total) {
            state.postsPagination.total = total
        },
        // updateIsLiked(state) {

        // }
        // checkLike(state, post) {
        //     post.likes.forEach((element) => {
        //         if(element==)
        //     })
        // }
    },
    state: {
        posts: [],
        postByID: {},
        isLiked: false,
        postsPagination: {
            total: null,
            limit: 5,
        }
    },
    getters: {
        posts: state => state.posts,
        postByID: state => state.postByID,
        postsPagination: state => state.postsPagination,
        postsPages: state => Math.ceil(state.postsPagination.total / state.postsPagination.limit)
    }
}