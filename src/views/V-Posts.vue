<template>
    <v-container>
        <v-row>
            <v-col class="posts col-9">
                <CreatePost v-if="isAuthenticated" />
                <div v-if="fetched">
                    <Post v-for="post in posts" :key="post._id" :post="post" />
                    <div class="pagination d-flex justify-center">
                        <v-pagination
                            v-model="currentPage"
                            :length="postsPages"
                            :total-visible="7"
                            color="#39BEA1"
                        ></v-pagination>
                    </div>
                </div>
                <v-skeleton-loader 
                    v-for="i in 5"
                    :key="i"
                    v-else
                    class="skeleton"
                    color="#f7f7f7"
                    type="list-item-avatar-two-line, image, table-heading"
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
import Post from '@/components/Post'
import CreatePost from '@/components/CreatePost'
import Navigation from '@/components/Navigation'

export default {
    name: "feed",
    components: {
        Post,
        CreatePost,
        Navigation
    },
    data: () => ({
        fetched: false,
        currentPage: 1
    }),
    computed: mapGetters(['posts', 'isAuthenticated', 'postsPages', 'postsPagination']),
    watch: {
        async currentPage() {
            this.fetched = false;
            await this.fetchPosts({
                skip: (this.currentPage - 1) * this.postsPagination.limit 
            });
            this.fetched = true
        }
    },
    methods: {
        ...mapActions(['fetchPosts']),
    },
    async mounted() {
        await this.fetchPosts();
        this.fetched = true
    }
}
</script>

<style scoped>
    .posts a {
        color: #000;
        text-decoration: none;
    }
    .skeleton {
        background: #FFF;
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