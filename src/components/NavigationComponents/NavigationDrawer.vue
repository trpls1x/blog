<template>
    <div>
        <v-btn class="d-block d-md-none" x-large icon @click="navbar = !navbar"><v-icon>mdi-menu</v-icon></v-btn>

        <v-navigation-drawer class="navbar" v-model="navbar" right absolute @click="navbar = !navbar">
            <v-list>
                <v-list-item-group v-if="!isAuthenticated"> 
                    <router-link :to="'/login'"><v-list-item>Sing in</v-list-item></router-link>
                    <router-link :to="'/register'"><v-list-item>Sing up</v-list-item></router-link>
                </v-list-item-group>
                <v-list-item-group v-else>
                    <router-link v-if="accountData" :to="'../users/' + accountData._id" @click="pushUserID">
                        <v-list-item @click="fetchData">{{ accountData.name ? accountData.name : 'No name'}}</v-list-item>
                    </router-link>
                    <v-list-item class="logout" @click="logout()">Logout</v-list-item>
                </v-list-item-group>
                <v-divider/>
                <v-list-item-group>
                    <router-link :to="'/posts'"><v-list-item>Posts</v-list-item></router-link>
                    <router-link :to="'/users'"><v-list-item>Users</v-list-item></router-link>
                    <router-link :to="'/graphs'"><v-list-item>Graphs</v-list-item></router-link>
                    <router-link :to="'/dnd'"><v-list-item>Drag and Drop</v-list-item></router-link>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: () => ({
        navbar: false
    }),
    computed: mapGetters(['accountData', 'isAuthenticated']),
    methods: {
        ...mapActions(['getUserByID', 'fetchPosts', 'logout']),
        async pushUserID() {
            await this.$router.push({ name: 'user', params: { userID: this.accountData._id } }).catch(() => {});
        },
        fetchData() {
            this.getUserByID(this.accountData._id),
            this.fetchPosts({postedBy: this.accountData._id, limit: 0})
        }
    }
}
</script>

<style lang="sass" scoped>
    .v-navigation-drawer 
        width: 100% !important
    
    .v-navigation-drawer--is-mobile 
        height: auto !important
        transform: translateY(0%) !important
    
    .v-navigation-drawer--close 
        transform: translateY(-100%) !important
    
    .v-list-item-group 
        * 
            display: flex
            justify-content: center
    
    .navbar 
        a 
            color: $font-dark
            text-decoration: none
    
    .logout 
        color: #b70000 !important
    
</style>