<template>
    <v-container>
        <v-row>
            <v-col v-if="contentLoaded" class="users col-9">
                <User  v-for="user in users" :key="user._id" :user="user"/>
                
                <div class="pagination d-flex justify-center">
                    <v-pagination
                        v-model="currentPage"
                        :length="usersPages"
                        :total-visible="7"
                        color="#39BEA1"
                    ></v-pagination>
                </div>
            </v-col>
            <v-col v-else class="col-9">
                <v-skeleton-loader 
                    v-for="i in usersPagination.limit"
                    :key="i"
                    class="skeleton"
                    type="list-item-avatar-two-line"
                ></v-skeleton-loader>
            </v-col>
            <v-col class="nav col-3">
                <Navigation />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import User from '@/components/User'
import Navigation from '@/components/Navigation'

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
    .users a {
        color: #000;
        text-decoration: none;
    }
    .skeleton {
        background: #fff;
        padding: 20px 0;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 15px;
    }
    .pagination {
        background: #F7F7F7;
        padding: 10px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 15px;
    }
</style>