<template>
    <router-link :to="'../posts/' + post._id" @click="pushPostID(post._id)">
        <div v-if="contentLoaded" class="post px-0 py-3 py-sm-5 mb-3">
            <v-row class="d-flex align-center py-0 px-3 px-sm-5">
                <div class="avatar pa-3">
                    <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                </div>
                <div class="head d-flex flex-column justify-center align-start">
                    <h4>{{author.name || 'No name'}}</h4>
                    <span class="text--disabled">{{ date }}</span>
                </div>
            </v-row>
            <v-row class="post-image py-0 mt-0">
                <v-col class="col-12 pb-0 pb-sm-3">
                    <Picture :image="post.image" :ratio="16/7" :type="'post'"/>
                </v-col>
            </v-row>
            <v-row class="py-0 px-3 px-sm-5">
                <div class="bottom d-flex justify-space-between pa-3">
                    <div class="text"><span>{{post.title}}</span></div>
                    <div class="d-flex">
                        <div class="d-flex align-center mr-2">
                            <v-icon>{{accountData && isLiked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon><span>{{post.likes.length}}</span>
                        </div>
                        <div class="d-flex align-center">
                            <v-icon class="mr-1">mdi-chat-outline</v-icon><span>{{commentsLength}}</span>
                        </div>
                    </div>
                </div> 
            </v-row>
        </div>
        <v-skeleton-loader 
            v-else
            class="skeleton pa-0 py-sm-5 mb-3"
            type="list-item-avatar-two-line, image, table-heading"
        ></v-skeleton-loader>
    </router-link>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import timeDifference from '@/services/timeDifference.service.js'
import Picture from '@/components/Picture'

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    components: {
        Picture
    },
    data: () => ({
        date: null,
        author: {},
        commentsLength: 0,
        contentLoaded: false,
        isLiked: false
    }),
    computed: mapGetters(['userByID', 'comments', 'accountData']),
    methods: {
        ...mapActions(['getUserByID', 'getComments']),
        pushPostID(id) {
            this.$router.push({ name: 'post', params: { postID: id } }).catch(() => {});
        },
    },
    async mounted() {
        this.date = timeDifference(this.post.dateCreated);
        await this.getUserByID(this.post.postedBy);
        this.author = this.userByID;
        await this.getComments(this.post._id);
        this.commentsLength = this.comments.length;
        if(this.accountData) {
            this.post.likes.forEach(like => {
                if(like == this.accountData._id) {
                    this.isLiked = true
                }
            });
        }
        
        this.contentLoaded = true
    }
}
</script>

<style lang="sass" scoped>
    .post, 
    .skeleton 
        background: #FFF
        @extend %card    
    
    .post 
        background: $main-white
        transition: .1s ease-in-out

        &:hover 
            box-shadow: $hover-shadow 
            transition: .2s ease-in-out

    .head
        span
            @media screen and (max-width: $xs-breakpoint)
                font-size: .8rem

    h4 
        @media screen and (max-width: $xs-breakpoint)
            font-size: .9rem

    .avatar
        width: 80px
        @media screen and (max-width: $xs-breakpoint)
            width: 70px
    
        .v-image 
            border-radius: 50%
    
    .text 
        font-size: 1.2rem
        font-weight: bold
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap

    .v-icon 
        color: $font-dark !important
    
    .bottom 
        width: 100%
</style>