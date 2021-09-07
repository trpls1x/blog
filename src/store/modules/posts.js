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
        async getPostByID({commit, getters}, postID) {
            const response = await api.get('/posts/' + postID);
            commit('updatePostByID', response);
            commit('updateIsLiked', false)
            if(getters.isAuthenticated) {
                response.likes.forEach(element => {
                    if(element == getters.accountData._id) {
                        commit('updateIsLiked', true)
                    }
                });
            }
        },
        async createPost(ctx, payload) {
            await api.post('/posts', payload)
        },
        async editPost({dispatch, getters}, payload) {
            await api.patch('/posts/' + getters.postByID._id, payload);
            dispatch('getPostByID', getters.postByID._id)
        },
        async editPostImage({getters}, photo) {
            await api.put('/posts/upload/' + getters.postByID._id, photo, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        async deletePost({getters}) {
            await api.delete('/posts/' + getters.postByID._id)
        },
        async likePost({getters}) {
            await api.put('/posts/like/' + getters.postByID._id)
        }
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
        updateIsLiked(state, value) {
            state.isLiked = value
        }
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
        postsPages: state => Math.ceil(state.postsPagination.total / state.postsPagination.limit),
        isLiked: state => state.isLiked
    }
}