<template>
    <v-container>
        <v-row>
            <v-col class="users col-12 col-md-4">
                <div v-if="contentLoaded">
                    <User v-for="user in users.slice(0, usersPagination.limit/2)" :key="user._id" :user="user"/>  
                </div>
                <v-skeleton-loader 
                    v-for="i in usersPagination.limit/2"
                    :key="i"
                    v-else
                    class="skeleton"
                    type="list-item-avatar-two-line"
                ></v-skeleton-loader>
            </v-col>
            <v-col class="users col-12 col-md-4 pt-0 pt-md-3">
                <div v-if="contentLoaded">
                    <User v-for="user in users.slice(usersPagination.limit/2)" :key="user._id" :user="user"/>
                </div>
                <v-skeleton-loader 
                    v-for="i in usersPagination.limit/2"
                    :key="i"
                    v-else
                    class="skeleton"
                    type="list-item-avatar-two-line"
                ></v-skeleton-loader>
            </v-col>
            <v-col class="nav col-md-4 d-none d-md-block">
                <Navigation />
            </v-col>
            <v-col class="col-12 col-md-8">
                <div class="pagination d-flex justify-center">
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
    name: "feed",
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
            this.contentLoaded = false
            await this.fetchUsers({
                skip: (this.currentPage - 1) * this.usersPagination.limit 
            });
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            this.contentLoaded = true
        }
    },
    methods: {
        ...mapActions(['fetchUsers'])
    },
    async mounted() {
        await this.fetchUsers();
        this.contentLoaded = true
    }
}
</script>

<style scoped>
    .nav {
        position: sticky;
        top: 12px
    }
    .users {
        padding-bottom: 0 !important;
    }
    .users a {
        color: #000;
        text-decoration: none;
    }
    .skeleton {
        background: #fff;
        padding: 20px 0;
        border-radius: 5px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 12px;
    }
    .pagination {
        background: #F7F7F7;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 15px;
    }

    @media screen and (max-width: 599px) {
        .skeleton {
            padding: 6px 0;
        }
    }
</style>