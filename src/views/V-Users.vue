<template>
    <v-container>
        <v-row>
            <v-col class="users col-12 col-md-4 pb-0">
                <div v-if="contentLoaded">
                    <User v-for="user in users.slice(0, usersPagination.limit/2)" :key="user._id" :user="user"/>  
                </div>
                <v-skeleton-loader 
                    v-for="i in usersPagination.limit/2"
                    :key="i"
                    v-else
                    class="skeleton px-0 py-2 mb-3"
                    type="list-item-avatar-two-line"
                ></v-skeleton-loader>
            </v-col>
            <v-col class="users col-12 col-md-4 py-0 pt-md-3">
                <div v-if="contentLoaded">
                    <User v-for="user in users.slice(usersPagination.limit/2)" :key="user._id" :user="user"/>
                </div>
                <v-skeleton-loader 
                    v-for="i in usersPagination.limit/2"
                    :key="i"
                    v-else
                    class="skeleton px-0 py-2 mb-3"
                    type="list-item-avatar-two-line"
                ></v-skeleton-loader>
            </v-col>
            <v-col class="nav col-md-4 d-none d-md-block">
                <Navigation />
            </v-col>
            <v-col class="col-12 col-md-8 pt-0">
                <div class="pagination d-flex justify-center pa-2">
                    <v-pagination
                        v-model="currentPage"
                        :length="usersPages"
                        :total-visible="7"
                        color="#39BEA1"
                    ></v-pagination>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import User from '@/components/User'
import Navigation from '@/components/NavigationComponents/Navigation'

export default {
    components: {
        User,
        Navigation
    },
    data: () => ({
        currentPage: 1,
        contentLoaded: false
    }),
    computed: mapGetters(['users', 'usersPages', 'usersPagination']),
    watch: {
        async currentPage() {
            this.contentLoaded = false;
            await this.fetchUsers({
                skip: (this.currentPage - 1) * this.usersPagination.limit 
            });
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            this.contentLoaded = true;
        }
    },
    async mounted() {
        await this.fetchUsers();
        this.contentLoaded = true;
    },
    methods: mapActions(['fetchUsers'])
}
</script>

<style lang="sass" scoped>
    .nav 
        position: sticky
        top: 12px
    
    .users 
        a 
            color: $font-dark
            text-decoration: none
    
    .skeleton,
    .pagination 
        @extend %card
    
    .skeleton 
        background: #fff

    .pagination 
        background: $main-white
</style>