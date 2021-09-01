export default ({
    actions: {},
    mutations: {
        updatePostsStatus(state) {
            state.postsLoaded = !state.postsLoaded
            console.log(state.postsLoaded, 'p');
        },
        updateUsersStatus(state) {
            state.usersLoaded = !state.usersLoaded
        },
        updateCommentsStatus(state) {
            state.commentsLoaded = !state.commentsLoaded
        },
    },
    state: {
        postsLoaded: true,
        usersLoaded: true,
        commentsLoaded: true
    },
    getters: {
        isLoaded(state) {
            // console.log(state.postsLoaded, 'p');
            // console.log(state.usersLoaded, 'u');
            // console.log(state.commentsLoaded, 'c');
            // console.log(state.postsLoaded && state.usersLoaded && state.commentsLoaded);
            return state.postsLoaded && state.usersLoaded && state.commentsLoaded
        }
        //isLoaded: state => state.postsLoaded && state.usersLoaded && state.commentsLoaded
    }
})