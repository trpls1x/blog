import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL
const apiPrefix = process.env.VUE_APP_API_PREFIX

export default {
    actions: {
        async fetchUsers({commit}) {
            try {
                const response = await axios.get(apiUrl + apiPrefix + '/users', {
                    params: {
                        limit: 0
                    }
                });
                commit('updateUsers', response.data.data)
            } catch(e) {
                console.log(e);
            }
        },
        async getUserByID({commit}, userID) {
            try {
                const response = await axios.get(apiUrl + apiPrefix + '/users/' + userID);
                commit('updateUserByID',response.data)
            } catch {
                commit('updateUserByID', {
                    name: 'DELETED'
                })
            }
        },
        async postUser({dispatch}, user) {
            try {
                await axios.post(apiUrl + apiPrefix + '/users', user)
                dispatch('postAuth', {
                    email: user.email,
                    password: user.password
                })
            } catch(e){
                console.log(e)
            }
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
        users: state => state.users,
        userByID: state => state.userByID
    }
}