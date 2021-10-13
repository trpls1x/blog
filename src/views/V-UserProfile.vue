<template>
    <v-container v-if="contentLoaded">
        <v-row class="user ma-0 pa-3 pa-sm-5">
            <v-col class="col-12 col-sm-4 avatar pa-0 pr-sm-3">
                <Picture :image="userByID.avatar" :ratio="1" :type="'avatar'"/>
                <div v-if="accountData && userByID._id == accountData._id" >
                    <ProfileButtons :user="accountData"/>
                </div>
            </v-col>
            <v-col class="col-12 col-sm-8 user-info pa-0 pt-3">
                <h1 class="p-0 pl-sm-3 text-center text-sm-start">{{ userByID.name || 'No name' }}</h1>
                <table>
                    <tbody>
                        <tr><td>E-mail:</td><td>{{ userByID.email }}</td></tr>
                        <tr><td>Extra details:</td><td>{{ userByID.extra_details || placeholder }}</td></tr>
                        <tr><td>Skills:</td><td>{{ userByID.skills || placeholder }}</td></tr>
                        <tr><td>Profession:</td><td>{{ userByID.profession || placeholder }}</td></tr>
                        <tr><td>Details:</td><td>{{ userByID.details || placeholder }}</td></tr>
                    </tbody>
                </table>
            </v-col>
        </v-row>
        <v-row class="user-posts mt-0">
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
    components: {
        Post,
        Picture,
        ProfileButtons
    },
    data: () => ({
        placeholder: 'Not specified',
        contentLoaded: false
    }),
    computed: mapGetters(['userByID', 'posts', 'accountData']),
    async created() {
        if(this.$route.params.id) {
            await this.getUserByID(this.$route.params.id);
            if(this.userByID._id == null)
                this.$router.push({path: '/user-not-found'});
            await this.fetchPosts({ 
                postedBy: this.$route.params.id,
                limit: 0
            });
            this.contentLoaded = true;
        } else {
            this.$router.push({path: '/user-not-found'});
        }
    },
    methods: {
        ...mapActions(['getUserByID', 'fetchPosts'])
    }
}
</script>

<style lang="sass" scoped>    
    .user
        background: $main-white
        @extend %card

    .user-posts 
        a 
            text-decoration: none
            color: $font-dark
    
    .avatar 
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