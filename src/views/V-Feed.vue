<template>
    <v-container>
        <v-row>
            <v-col class="posts col-12">
                <Post v-for="post in posts" :key="post._id" :post="post"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Post from '@/components/Post'

export default {
    name: "feed",
    components: {
        Post
    },
    computed: mapGetters(['posts', 'users']),
    methods: {
        ...mapActions(['fetchPosts', 'fetchUsers'])
    },
    mounted() {
        this.fetchPosts();
        this.fetchUsers();
    }
}
</script>

<style scoped>
    .users {
        margin: 12px 0 22px;
    }
    .users{
        background: #f7f7f7;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
    }
    .users a, .posts a {
        color: #000;
        text-decoration: none;
    }
    .avatar img {
        width: 100%;
    }
</style>