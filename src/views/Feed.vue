<template>
    <v-container>
            <v-row>
                <v-col class="posts col-8">
                    <div class="post" v-for="post in posts" :key="post._id">
                        <h3>{{ post.title }}</h3>
                        <p>{{ post.description }}</p>
                        <div class="d-flex justify-space-between"><span>{{post.dateCreated.split("T")[0]}}</span><span><v-icon>mdi-heart</v-icon> {{post.likes.length}}</span></div>
                    </div>
                </v-col>
                <v-col class="users col-4">
                    <router-link v-for="user in users" :key="user._id" :to="'../users/' + user._id" @click.native="getUserByID(user._id); getPostsByUserID(user._id)">
                        <v-row class="user" >
                            <v-col class="col-3 avatar d-flex justify-center align-center">
                                <v-avatar>
                                    <!-- <img v-if="user.avatar" :src="'https://nodejs-test-api-blog.herokuapp.com' + user.avatar" alt="avatar"> -->
                                    <!-- <img v-else src="../assets/avatar.png" alt="avatar"> -->
                                    <img src="../assets/avatar.png" alt="avatar">
                                </v-avatar>
                            </v-col>
                            <v-col class="col-8">
                                <h3>{{ user.name }}</h3>
                                <span>{{ user.email }}</span>
                            </v-col>
                        </v-row>
                    </router-link>
                </v-col>
            </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "feed",
    mounted() {
        this.fetchPosts();
        this.fetchUsers();
    },
    computed: mapGetters(['posts', 'users']),
    methods: {
        ...mapActions(['fetchPosts', 'fetchUsers', 'getUserByID', 'getPostsByUserID']),
    }
}
</script>

<style scoped>
    .users {
        margin: 12px 0 22px;
    }
    .users, .post {
        background: #f7f7f7;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
    }
    .users a {
        text-decoration: none;
    }
    .user {
        color: #000;
        margin-bottom: 12px;
    }
    .user:hover {
        box-shadow: 0 0 1pt 2pt #39BEA1;
        border-radius: 15px;
    }
    .user *{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .avatar img {
        width: 100%;
    }
    .post {
        margin-bottom: 10px;
    }
</style>