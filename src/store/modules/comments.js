import axios from "axios"
const apiUrl = process.env.VUE_APP_API_URL
const apiPrefix = process.env.VUE_APP_API_PREFIX

export default ({
    actions: {
        async getComments({commit}, postID) {
            const response = await axios.get(apiUrl + apiPrefix + '/comments/post/' + postID)
            commit('updateComments', response.data)
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
        comments(state) {
            return state.comments
        }
    }
})