<template>
    <v-container>
        <v-row>
            <v-col class="posts col-12 col-md-8 order-last order-md-first">
                <div v-if="isAuthenticated">
                    <CreatePost :page="currentPage" :limit="postsPagination.limit"/>
                </div>
                
                <div v-if="contentLoaded">
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
                    v-for="i in postsPagination.limit"
                    :key="i"
                    v-else
                    class="skeleton"
                    color="#f7f7f7"
                    type="list-item-avatar-two-line, image, table-heading"
                ></v-skeleton-loader>
            </v-col>
            <v-col class="col-md-4 order-first order-md-last pb-0">
                <div class="nav">
                    <Navigation/>
                    <v-text-field 
                        v-model="searchText"
                        class="search"
                        color="#39BEA1"
                        placeholder="Search for post..."
                        append-icon="mdi-magnify"
                        hide-details="auto"
                        @keydown="typing()"
                        @keyup="finishedTyping()"
                        @click:clear="finishedTyping()"
                        solo
                        clearable
                    >
                    </v-text-field>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Post from '@/components/Post'
import CreatePost from '@/components/PostComponents/CreatePost'
import Navigation from '@/components/NavigationComponents/Navigation'

export default {
    name: "feed",
    components: {
        Post,
        CreatePost,
        Navigation
    },
    data: () => ({
        contentLoaded: false,
        currentPage: 1,
        typingTimer: null,
        searchText: ''
    }),
    computed: mapGetters(['posts', 'isAuthenticated', 'postsPages', 'postsPagination']),
    watch: {
        async currentPage() {
            this.contentLoaded = false;
            await this.fetchPosts({
                skip: (this.currentPage - 1) * this.postsPagination.limit,
                search: this.searchText
            });
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            this.contentLoaded = true
        }
    },
    methods: {
        ...mapActions(['fetchPosts']),
        typing() {
            clearTimeout(this.typingTimer)
        },
        finishedTyping() {
            clearTimeout(this.typingTimer);
            this.typingTimer = setTimeout(() => this.search(), 500);
        },
        async search() {
            this.contentLoaded = false;
            await this.fetchPosts({
                search: this.searchText
            });
            this.contentLoaded = true
        }
    },
    async mounted() {
        await this.fetchPosts();
        this.contentLoaded = true
    }
}
</script>

<style scoped>
    .nav {
        position: sticky;
        top: 12px
    }
    .posts a {
        color: rgba(0, 0, 0, 0.87);
        text-decoration: none;
    }
    .skeleton{
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
    }
    .search {
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        padding-bottom: 0;
    }

    @media screen and (max-width: 599px) {
        .skeleton {
            padding: 0 0
        }
    }
</style>