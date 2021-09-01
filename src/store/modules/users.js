import api from "@/services/axiosApi";

export default {
    actions: {
        async fetchUsers({commit}) {
            const response = await api.get('/users', {
                params: {
                    limit: 0
                }
            });
            commit('updateUsers', response.data)
        },
        async getUserByID({commit}, userID) {
            try {
                const response = await api.get('/users/' + userID);
                commit('updateUserByID',response)
            } catch {
                commit('updateUserByID', {
                    name: 'DELETED',
                    id: 'deleted',
                })
            }
        },
        async postUser({dispatch}, user) {
            await api.post('/users', user)
            dispatch('userAuthorization', {
                email: user.email,
                password: user.password
            })
        },
        async editUser({getters}, payload) {
            await api.patch('/users/' + getters.accountData._id, payload);
        },
        async deleteUser({dispatch, getters}) {
            await api.delete('/users/'+ getters.accountData._id)
            dispatch('logout')
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