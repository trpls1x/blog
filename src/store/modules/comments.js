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
        async likeComment(ctx, commentID) {
            await api.put('/comments/like/' + commentID)
        }
    },
    mutations: {
        updateComments(state, comments) {
            state.comments = comments;
        },
        addAuthor(state, {index, author}) {
            state.comments[index].author = author
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