<template>
    <v-container>
        <v-row class="user-info">
            <v-col class="col-4 avatar">
                <Avatar :avatar="userByID.avatar"/>
            </v-col>
            <v-col class="col-8">
                <h1>{{userByID.name}}</h1>
                <table>
                    <tbody>
                        <tr><td>E-mail:</td><td>{{userByID.email  || 'Not specified'}}</td></tr>
                        <tr><td>Extra details:</td><td>{{userByID.extra_details || 'Not specified'}}</td></tr>
                        <tr><td>Skills:</td><td>{{userByID.skills || 'Not specified'}}</td></tr>
                        <tr><td>Profession:</td><td>{{userByID.profession || 'Not specified'}}</td></tr>
                        <tr><td>Details:</td><td>{{userByID.details || 'Not specified'}}</td></tr>
                    </tbody>
                </table>
            </v-col>
        </v-row>
        <v-row class="user-posts d-flex flex-column align-stretch">
            <Post v-for="post in postsByUserID" :key="post._id" :post="post"/>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions ,mapGetters } from 'vuex'
import Post from '@/components/Post'
import Avatar from '@/components/Avatar'

export default {
    name: "user",
    components: {
        Post,
        Avatar
    },
    data: () => ({
    }),
    computed: mapGetters(['userByID', 'postsByUserID']),
    methods: {
        ...mapActions(['getUserByID', 'getPostsByUserID']),
        pushPostID(id) {
            this.$router.push({ name: 'post', params: { postID: id } }).catch(() => {});
        }
    },
    async mounted() {
        await this.getUserByID(this.$route.params.id);
        await this.getPostsByUserID(this.$route.params.id);
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
</style>