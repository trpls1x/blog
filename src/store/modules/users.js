import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL
const apiPrefix = process.env.VUE_APP_API_PREFIX

export default {
    actions: {
        async fetchUsers({commit}) {
            const response = await axios.get(apiUrl + apiPrefix + '/users', {
                params: {
                    limit: ''
                }
            });
            commit('updateUsers', response.data.data)
        },
        async getUserByID({commit}, userID) {
            const response = await axios.get(apiUrl + apiPrefix + '/users/' + userID);
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