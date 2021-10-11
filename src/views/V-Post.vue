<template>
    <v-container>
        <div v-if="contentLoaded">
            <div class="post">
                <v-row>
                    <v-col class="col-2 col-sm-2 col-md-2 col-lg-1 avatar pr-0 pr-sm-3 ">
                        <router-link :to="author._id ? '/users/' + author._id : '/deleted'" @click="pushUserID">
                            <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                        </router-link>
                    </v-col>
                    <v-col class="col-md-9 col-lg-10 post-head d-flex flex-column justify-center pl-3 pl-sm-0">
                        <div class="d-flex flex-column flex-sm-row align-start align-sm-center">
                            <h2 class="mr-3"><router-link :to="'/users/' + author._id" @click="pushUserID">{{ author.name || 'No name' }}</router-link></h2>
                            <span class="text--disabled">{{ date }}</span>
                        </div>
                        <h1 class="d-none d-sm-block">{{ postByID.title }}</h1>
                    </v-col>
                    <v-col v-if="accountData && author._id == accountData._id" class="col-1 d-flex align-center justify-center dots">
                        <PostMenu/>
                    </v-col>
                </v-row>
                <v-row class="post-image">
                    <v-col class="col-12 py-0 mt-3" @dblclick="putLike">
                        <Picture
                            :image="postByID.image"
                            :ratio="16/9"
                            :type="'full-post'"
                        />
                    </v-col>
                    <v-btn class="like d-block d-md-none" @click="putLike" fab small>
                        <v-badge v-if="postByID.likes" color="#39BEA1" :content="postByID.likes.length || '0'">
                            <v-icon>{{isLiked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                        </v-badge>
                    </v-btn>
                </v-row>
                <v-row>
                    <v-col class="col-12 col-md-11">
                        <h1 class="d-block d-sm-none">{{ postByID.title }}</h1>
                        <h2>{{ postByID.description }}</h2>
                        <span>{{ postByID.fullText }}</span>
                    </v-col>
                    <v-col class="col-1 d-none d-md-flex justify-center align-center ">
                        <v-btn @click="putLike" fab>
                            <v-badge v-if="postByID.likes" color="#39BEA1" :content="postByID.likes.length || '0'">
                                <v-icon>{{isLiked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                            </v-badge>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <div class="comments">
                <v-row>
                    <h2>Comment section: {{ comments.length }}</h2>
                    <CreateComment v-if="accountData"/>
                    <Comment v-for="comment in comments" :key="comment._id" :comment="comment"/>
                </v-row>
            </div>
        </div>
        <div v-else>
            <v-skeleton-loader 
                class="skeleton"
                type="list-item-avatar-three-line, image, list-item-three-line"
            ></v-skeleton-loader>
            <div class="skeleton">
                <v-skeleton-loader 
                    v-for="i in 3"
                    :key="i"
                    type="list-item-avatar-two-line"
                ></v-skeleton-loader>
            </div>
        </div>
        <v-snackbar
            v-model="snackbar"
            top
            transition="slide-y-transition"
            elevation="24"
            color="#b70000"
            >
            Please sing in to complete this action

            <template v-slot:action="{ attrs }">
                <v-btn
                color="#f7f7f7"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import timeDifference from '@/services/timeDifference.service.js'
import Picture from '@/components/Picture'
import PostMenu from '@/components/PostComponents/PostMenu'
import CreateComment from '@/components/CommentComponents/CreateComment'
import Comment from '@/components/CommentComponents/Comment'

export default {
    components: {
        Picture,
        PostMenu,
        CreateComment,
        Comment
    },
    data: () => ({
        author: {},
        date: '',
        isLiked: false,
        likeRequest: false,
        contentLoaded: false,
        snackbar: false
    }),
    computed: mapGetters(['postByID', 'userByID', 'comments', 'isAuthenticated', 'accountData']),
    methods: {
        ...mapActions(['getPostByID', 'getUserByID', 'getComments', 'likePost']),
        ...mapMutations(['updateFollowedComment']),
        pushUserID() {
            this.$router.push({ name: 'user', params: { userID: this.author._id } }).catch(() => {});
        },
        async putLike() {
            if(!this.likeRequest) {
                this.likeRequest = true;
                try {
                    await this.likePost();
                    await this.getPostByID(this.$route.params.id)
                    this.isLiked = !this.isLiked;
                } catch {
                    this.snackbar = true;
                } finally {
                    this.likeRequest = false;
                }
            }
        }
    },
    async mounted() {
        this.updateFollowedComment({comment: null});
        await this.getPostByID(this.$route.params.id);
        if(this.isAuthenticated) {
            this.postByID.likes.forEach(element => {
                if(element == this.accountData._id) {
                    this.isLiked = true;
                }
            });
        }
        await this.getUserByID(this.postByID.postedBy);
        this.author = this.userByID;
        await this.getComments(this.postByID._id);
        this.date = timeDifference(this.postByID.dateCreated); 

        this.contentLoaded = true
    },
}
</script>

<style lang="sass" scoped>
    .row 
        padding: 0 30px
        @media screen and (max-width: 599px) 
            padding: 0 12px
    
    a 
        text-decoration: none
        color: $font-dark
    
    .post, 
    .comments, 
    .skeleton 
        background: $main-white
        padding: 20px 0
        word-break: break-word
        @extend %card
        @media screen and (max-width: 599px) 
            padding: 12px 0
    
    .comments, 
    .skeleton 
        margin-top: 12px

    .post 
        h2 
            @media screen and (max-width: 599px) 
                font-size: 1rem

    .comments 
        h2 
            padding: 12px 12px 0
    
    .avatar 
        padding: 12px
        width: auto
        @media screen and (max-width: 599px)
            width: 70px !important
    
        .v-image 
            width: 120px
            border-radius: 50%
    
    .post-head 
        padding: 12px
        @media screen and (max-width: 599px) 
            padding: 12px 0

    
        h1 
            word-break: break-all
            @media screen and (max-width: 599px) 
                font-size: 1.3rem

        span
            @media screen and (max-width: 599px) 
                font-size: 0.8rem
    
    .post-image 
        padding: 0
        margin-top: 0
        position: relative
        @media screen and (max-width: 599px) 
            padding: 0
            margin-top: 0

        .col
            @media screen and (max-width: 599px)
                padding-bottom: 0
    
    .like 
        position: absolute
        bottom: -5px
        right: 22px
    
    .dots 
        padding: 12px 0
    
    .skeleton 
        background: #fff
        
        &:first-child 
            margin-top: 0
</style>