export default ({
    actions: {},
    mutations: {
        updateLoadingStatus(state) {
            state.isLoading != state.isLoading
            console.log(state.isLoading)
        }
    },
    state: {
        isLoading: false
    },
    getters: {
        isLoading: state => state.isLoading
    }
})