<template>
    <v-container>
        <v-row>
            <v-col class="users col-9">
                <User v-for="user in users" :key="user._id" :user="user"/>
                <div class="pagination d-flex justify-center">
                    <v-pagination
                        v-model="currentPage"
                        :length="usersPages"
                        :total-visible="7"
                        color="#39BEA1"
                    ></v-pagination>
                </div>
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
        currentPage: 1
    }),
    computed: mapGetters(['users', 'usersPages', 'usersPagination']),
    watch: {
        async currentPage() {
            await this.fetchUsers({
                skip: (this.currentPage - 1) * this.usersPagination.limit 
            });
        }
    },
    methods: {
        ...mapActions(['fetchUsers'])
    },
    mounted() {
        this.fetchUsers();
    }
}
</script>

<style scoped>
    .users a {
        color: #000;
        text-decoration: none;
    }
    .pagination {
        background: #F7F7F7;
        padding: 10px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 15px;
    }
</style>