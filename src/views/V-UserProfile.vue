<template>
    <v-container v-if="contentLoaded">
        <v-row class="user">
            <v-col class="col-12 col-sm-4 avatar">
                <Picture :image="userByID.avatar" :ratio="1" :type="'avatar'"/>
                <div v-if="isAuthenticated && userByID._id == accountData._id" >
                    <ProfileButtons :user="accountData"/>
                </div>
            </v-col>
            <v-col class="col-12 col-sm-8 user-info">
                <h1>{{userByID.name || 'No name'}}</h1>
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
        if(this.$route.params.id) {
            await this.getUserByID(this.$route.params.id);
            if(this.userByID._id == null) {
                this.$router.push({path: '/user-not-found'})
            }
            await this.fetchPosts({ 
                postedBy: this.$route.params.id,
                limit: 0
            });
            this.contentLoaded = true
        } else {
            this.$router.push({path: '/user-not-found'})
        }
        
    }
}
</script>

<style lang="sass" scoped>
    .container 
        padding-bottom: 0
    
    .user 
        margin-top: 0
        margin-bottom: 12px
        margin: 0 0
        background: $main-white
        padding: 20px
        @extend %card
        @media screen and (max-width: 599px)
            padding: 12px

    .user-info
        @media screen and (max-width: 599px)
            padding: 12px 0 0

    .user-posts 
        margin: 0 0
        padding-top: 12px

        a 
            text-decoration: none
            color: #000

        .col-12
            padding: 0

    h1
        padding-left: 15px
        @media screen and (max-width: 599px)
            padding: 0
            text-align: center 
    
    .avatar 
        @media screen and (max-width: 599px)
            padding: 0
        .v-image 
            border-radius: 5px
    
    table 
        border-spacing: 15px

        tr 
            td 
                word-break: break-word
                vertical-align: top
    
                &:first-child
                    white-space: nowrap
</style>