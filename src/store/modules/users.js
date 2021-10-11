import api from "@/services/axiosApi";

export default {
    actions: {
        async fetchUsers({commit, getters}, payload) {
            const response = await api.get('/users', {
                params: {
                    limit: getters.usersPagination.limit,
                    ...payload,
                }
            });
            commit('updateTotalUsers', response.pagination.total)
            commit('updateUsers', response.data)
        },
        async getUserByID({commit}, userID) {
            if(userID) {
                try {
                    const response = await api.get('/users/' + userID);
                    commit('updateUserByID', response)
                } catch {
                    commit('updateUserByID', {
                        name: 'DELETED',
                        _id: null,
                    })
                }
            } else {
                commit('updateUserByID', {
                    name: 'DELETED',
                    _id: null,
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
        async editUserPhoto({getters}, photo) {
            await api.put('/users/upload/' + getters.accountData._id, photo, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        async deleteUser({dispatch, getters}) {
            await getters.posts.forEach(element => {
                dispatch('deletePost', element._id)
            });
            await api.delete('/users/'+ getters.accountData._id)

            dispatch('logout')
        },
        
    },
    mutations: {
        updateUsers(state, users) {
            state.users = users
        },
        updateUserByID(state, user) {
            state.userByID = user
        },
        updateTotalUsers(state, total) {
            state.usersPagination.total = total
        }
    },
    state: {
        users: [],
        userByID: {},
        usersPagination: {
            total: null,
            limit: 18,
        }
    },
    getters: {
        users: state => state.users,
        userByID: state => state.userByID,
        usersPagination: state => state.usersPagination,
        usersPages: state => Math.ceil(state.usersPagination.total / state.usersPagination.limit)
    }
}