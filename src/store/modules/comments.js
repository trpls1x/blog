import api from "@/services/axiosApi";

export default ({
    actions: {
        async getComments({commit}, postID) {
            const response = await api.get('/comments/post/' + postID)
            commit('updateComments', response)
        },
        async postComment({getters}, payload) {
            await api.post('/comments/post/' + getters.postByID._id, payload)
        },
        async editComment({dispatch, getters}, payload) {
            await api.patch('/comments/' + payload.commentID, payload.comment);
            dispatch('getComments', getters.postByID._id)
        },
        async deleteComment({dispatch, getters}, commentID) {
            await api.delete('/comments/' + commentID)
            dispatch('getComments', getters.postByID._id)
        },
        async likeComment(ctx, commentID) {
            await api.put('/comments/like/' + commentID)
        }
    },
    mutations: {
        updateComments(state, comments) {
            state.comments = comments;
        },
        updateFollowedComment(state, {comment, author}) {
            state.followedComment = comment;
            if(comment) {
                state.followedComment.author = author
            }
        }
    },
    state: {
        comments: [],
        followedComment: null
    },
    getters: {
        comments: state => state.comments,
        followedComment: state => state.followedComment
    }
})