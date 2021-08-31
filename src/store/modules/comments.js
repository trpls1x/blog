import axios from "axios"
const apiUrl = process.env.VUE_APP_API_URL
const apiPrefix = process.env.VUE_APP_API_PREFIX

export default ({
    actions: {
        async getComments({commit}, postID) {
            try {
                const response = await axios.get(apiUrl + apiPrefix + '/comments/post/' + postID)
                commit('updateComments', response.data)
            } catch(e) {
                console.log(e);
            }
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