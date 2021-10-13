import api from "@/services/axiosApi";

export default {
    actions: {
        async userAuthorization({commit, dispatch}, payload) {
            const response = await api.post('/auth', payload);
            commit('updateToken', response.token);
            dispatch('getAccountData')
        },
        async getAccountData({commit}) {
            const response = await api.get('/auth/user');
            commit('updateAccountData', response);
        },
        logout({commit}) {
            localStorage.removeItem('token')
            commit('updateToken', '');
            commit('updateAccountData', null);
        }
    },
    mutations: {
        updateToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        updateAccountData(state, data) {
            state.accountData = data;
        },
    },
    state: {
        token: localStorage.getItem('token') || '',
        accountData: null
    },
    getters: {
        accountData: state => state.accountData
    }
}