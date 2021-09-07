<template>
    <v-container v-if="contentLoaded">
        <v-row class="user-info">
            <v-col class="col-4 avatar">
                <Picture :image="userByID.avatar" :ratio="1" :type="'avatar'"/>
                <div v-if="isAuthenticated && userByID._id == accountData._id" >
                    <ProfileButtons :user="accountData"/>
                </div>
            </v-col>
            <v-col class="col-8">
                <h1>{{userByID.name}}</h1>
                <table>
                    <tbody>
                        <tr><td>E-mail:</td><td>{{userByID.email}}</td></tr>
                        <tr><td>Extra details:</td><td>{{userByID.extra_details || placeholder}}</td></tr>
                        <tr><td>Skills:</td><td>{{userByID.skills || placeholder}}</td></tr>
                        <tr><td>Profession:</td><td>{{userByID.profession || placeholder}}</td></tr>
                        <tr><td>Details:</td><td>{{userByID.details || placeholder}}</td></tr>
                    </tbody>
                </table>
            </v-col>
        </v-row>
        <v-row class="user-posts">
            <v-col class="col-12">
                <Post v-for="post in posts" :key="post._id" :post="post"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Post from '@/components/Post'
import Picture from '@/components/Picture'
import ProfileButtons from '@/components/ProfileComponents/ProfileButtons'

export default {
    name: "user",
    components: {
        Post,
        Picture,
        ProfileButtons
    },
    data: () => ({
        placeholder: 'Not specified',
        contentLoaded: false
    }),
    computed: mapGetters(['userByID', 'posts', 'isAuthenticated', 'accountData']),
    methods: {
        ...mapActions(['getUserByID', 'fetchPosts'])
    },
    async created() {
        await this.getUserByID(this.$route.params.id);
        await this.fetchPosts({ 
            postedBy: this.$route.params.id,
            limit: 0
        });
        this.contentLoaded = true
    }
}
</script>

<style scoped>
    .user-info {
        margin-top: 0;
        margin-bottom: 12px;
        background: #f7f7f7;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
    }
    h1 {
        padding-left: 15px;
    }
    .avatar img {
        width: 100%;
    }
    .user-posts a {
        text-decoration: none;
        color: #000;
    }
    table {
        border-spacing: 15px;
    }
    table td{
        vertical-align: top;
    }
    table tr td:first-child {
        white-space: nowrap;
    }
    table tr td {
        word-break: break-word;
    }
    .user-posts .col-12 {
        padding: 0;
    }
</style>