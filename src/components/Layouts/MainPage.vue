<template>
    <v-app>
        <header>
            <v-container class="d-flex align-center justify-space-between">
                <router-link class="logo" :to="'/'"><v-img src="@/assets/logo.svg" alt="logo"/></router-link>
                <div class="d-none d-md-block ml-auto">
                    <div v-if="isAuthenticated" class="profile">
                        <v-menu v-if="accountData" offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on">
                                    <v-avatar><Picture :image="accountData.avatar" :type="'avatar'"/></v-avatar>
                                    <span class="ml-3">{{ accountData.name ? accountData.name : 'No name'}}</span>
                                    <v-icon>mdi-menu-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <router-link :to="'../users/' + accountData._id" @click="pushUserID" >
                                    <v-list-item @click="fetchData">
                                        <v-list-item-title>Profile</v-list-item-title>
                                    </v-list-item>
                                </router-link>
                                <v-list-item @click="logout(); $router.go(0)"><v-list-item-title>Logout</v-list-item-title></v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <div v-else class="d-flex justify-end align-center links">
                        <router-link :to="'/login'">Sing in</router-link><router-link :to="'/register'">Sing up</router-link>
                    </div>
                </div>

                <div>
                    <NavigationDrawer/>
                </div>
            </v-container>
        </header>
        
        <router-view/>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Picture from '@/components/Picture'
import NavigationDrawer from '@/components/NavigationComponents/NavigationDrawer'

export default {
    name: "main-page",
    components: {
        Picture,
        NavigationDrawer
    },
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
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap')
   
    header 
        font-family: 'Open Sans', sans-serif
        font-size: 1.2rem
        background: $main-white
        box-shadow: $default-shadow
    
    a 
        text-decoration: none
    
    .logo 
        width: 150px
    
    .links 
        a 
            padding: 8px 12px
            margin-left: 5px
            color: $main-green
            
            &:first-of-type 
                box-shadow: 0 0 1pt 2pt $main-green
                border-top-left-radius: 25px
                border-bottom-right-radius: 25px
                transition: .2s ease-in-out
                
                &:hover 
                    background: $main-green
                    color: $main-white
                    transition: .2s ease-in-out
    
    .v-image 
        width: 100%
        align-self: center
    
    .profile 
        .v-btn 
            height: 100%
    
</style>