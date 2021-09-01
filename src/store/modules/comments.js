import api from "@/services/axiosApi";

export default ({
    actions: {
        async getComments({commit}, postID) {
            const response = await api.get('/comments/post/' + postID)
            commit('updateComments', response)
        }
    },
    mutations: {
        updateComments(state, comments) {
            state.comments = comments
        }
    },
    state: {
        comments: []
    },
    getters: {
        comments: state => state.comments
    }
})