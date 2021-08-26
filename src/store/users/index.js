import axios from "axios";

export default {
    actions: {
        async fetchUsers({commit}) {
            const response = await axios.get('https://nodejs-test-api-blog.herokuapp.com/api/v1/users', {
                params: {
                    limit: ''
                }
            });
            commit('updateUsers', response.data.data)
        },
        async getUserByID({commit}, userID) {
            const response = await axios.get('https://nodejs-test-api-blog.herokuapp.com/api/v1/users/' + userID);
            commit('updateUserByID',response.data)
        }
    },
    mutations: {
        updateUsers(state, users) {
            state.users = users
        },
        updateUserByID(state, user) {
            state.userByID = user
        }
    },
    state: {
        users: [],
        userByID: {}
    },
    getters: {
        users(state) {
            return state.users
        },
        userByID(state) {
            return state.userByID
        }
    }
}