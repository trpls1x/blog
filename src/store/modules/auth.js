import axiosApiInstance from "@/services/axiosApiInstance";

export default {
    actions: {
        async userAuthorization({ commit }, payload) {
            try { 
                const response = await axiosApiInstance.post('/auth', payload);
                commit('updateToken', response.token);
            } catch(e) {
                console.log(e);
            }
        },
        async getAccountData({commit}) {
            try {
                const response = await axiosApiInstance.get('/auth/user');
                commit('updateAccountData', response);
            } catch(e) {
                console.log(e);
            }
        },
        logout({commit}) {
            localStorage.removeItem('token')
            commit('updateToken', '');
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
        isAuthenticated: state => !!state.token,
        accountData: state => state.accountData
    }
}