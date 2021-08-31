import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL
const apiPrefix = process.env.VUE_APP_API_PREFIX

export default {
    actions: {
        async postAuth({commit}, payload) {
            try { 
                const response = await axios.post(apiUrl + apiPrefix + '/auth', payload);
                commit('updateToken', response.data.token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            } catch(e) {
                console.log(e);
            }
        },
        async getAccountData({commit}) {
            try {
                const response = await axios.get(apiUrl + apiPrefix + '/auth/user');
                commit('updateAccountData', response.data);
            } catch(e) {
                console.log(e);
            }
        },
        logout({commit}) {
            localStorage.removeItem('token')
            commit('updateToken', '');
            delete axios.defaults.headers.common['Authorization']
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