<template>
    <v-container>
        <v-row class="user-info">
            <v-col class="col-4 avatar">
                <img v-if="userByID.avatar" :src="'https://nodejs-test-api-blog.herokuapp.com' + userByID.avatar" alt="avatar">
                <img v-else src="../assets/avatar.png" alt="avatar">
            </v-col>
            <v-col class="col-8">
                <h1>{{userByID.name}}</h1>
            </v-col>
        </v-row>
        <v-row class="user-posts">
            <div class="post" v-for="post in postsByUserID" :key="post._id">
                <h3>{{ post.title }}</h3>
                <p>{{ post.description }}</p>
                <div class="d-flex justify-space-between"><span>{{post.dateCreated.split("T")[0]}}</span><span><v-icon>mdi-heart</v-icon> {{post.likes.length}}</span></div>
            </div>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "user",
    computed: mapGetters(['userByID', 'postsByUserID'])
}
</script>

<style scoped>
    .user-info {
        margin-top: 6px;
        background: #f7f7f7;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
    }
    .avatar img {
        width: 100%;
    }
</style>