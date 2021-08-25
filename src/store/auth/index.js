import axios from "axios";

export default {
    actions: {
        postUser({commit}, params) {
            axios.post('https://nodejs-test-api-blog.herokuapp.com/api/v1/auth', {
                params: {
                    "email": params.email,
                    "password": params.password
                }
            })
            .then(response => {
                console.log(response.data)
                commit('updateToken', response.data.token)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    mutations: {
        updateToken(state, token) {
            state.token = token
        }
    },
    state: {
        token: ''
    },
    getters: {}
}