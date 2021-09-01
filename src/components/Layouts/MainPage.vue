<template>
    <v-app>
        <header>
            <v-container class="d-flex align-center justify-space-between">
                <router-link :to="'/'"><v-img src="@/assets/logo.svg" alt="logo"/></router-link>
                <div v-if="isAuthenticated" class="profile">
                    <v-avatar><Picture :image="accountData.avatar" :type="'avatar'"/></v-avatar>
                    <span>{{accountData.name}}</span>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on">mdi-menu-down</v-icon>
                        </template>
                        <v-list>
                            <router-link @click="pushUserID(accountData._id)" :to="'/users/' + accountData._id"><v-list-item><v-list-item-title>Profile</v-list-item-title></v-list-item></router-link>
                            <v-list-item @click="logout"><v-list-item-title>Logout</v-list-item-title></v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <div v-else class="d-flex justify-end align-center links">
                    <router-link :to="'/login'">Sing in</router-link><router-link :to="'/register'">Sing up</router-link>
                </div>
            </v-container>
        </header>
        
        <router-view/>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Picture from '@/components/Picture'

export default {
    name: "main-page",
    components: {
        Picture
    },
    computed: mapGetters(['accountData', 'isAuthenticated']),
    methods: {
        ...mapActions(['logout']),
        pushUserID(id) {
            this.$router.push({ name: 'user', params: { userID: id } }).catch(() => {});
        },
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap');
    header {
        font-family: 'Open Sans', sans-serif;
        font-size: 1.2rem;
        padding: 5px 0;
        background: #f7f7f7;
        vertical-align: middle;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
    }
    .links a {
        padding: 7px 12px;
        margin-left: 5px;
        color: #39BEA1;
        text-decoration: none;
    }
    .links a:first-of-type {
        box-shadow: 0 0 1pt 2pt #39BEA1;
        border-top-left-radius: 25px;
        border-bottom-right-radius: 25px;
        transition: .2s ease-in-out
    }
    .links a:first-of-type:hover {
        background: #39BEA1;
        color: #f7f7f7;
        transition: .2s ease-in-out;
    }
    .v-image {
        width: 50%;
        align-self: center;
    }
    .profile span {
        margin-left: 15px;
    }
</style>