<template>
    <v-container>
        <v-row>
            <v-col class="posts col-9">
                <Post v-for="post in posts" :key="post._id" :post="post"/>
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
import Navigation from '@/components/Navigation'

export default {
    name: "feed",
    components: {
        Post,
        Navigation
    },
    computed: mapGetters(['posts']),
    methods: {
        ...mapActions(['fetchPosts'])
    },
    mounted() {
        this.fetchPosts();
    }
}
</script>

<style scoped>
    .posts a {
        color: #000;
        text-decoration: none;
    }
</style>