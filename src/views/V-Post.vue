<template>
    <v-container>
        <div v-if="contentLoaded">
            <div class="post px-0 py-3 py-sm-5">
                <v-row class="py-0 px-3 px-sm-7">
                    <v-col class="avatar col-2 col-sm-2 col-md-2 col-lg-1 p-3">
                        <router-link :to="author._id ? '/users/' + author._id : '/deleted'" @click="pushUserID">
                            <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                        </router-link>
                    </v-col>
                    <v-col class="col-md-9 col-lg-10 post-head d-flex flex-column justify-center px-0 py-3 pa-sm-3">
                        <div class="d-flex flex-column flex-sm-row align-start align-sm-center">
                            <h2 class="mr-3"><router-link :to="'/users/' + author._id" @click="pushUserID">{{ author.name || 'No name' }}</router-link></h2>
                            <span class="text--disabled">{{ date }}</span>
                        </div>
                        <h1 class="d-none d-sm-block">{{ postByID.title }}</h1>
                    </v-col>
                    <v-col v-if="accountData && author._id == accountData._id" class="col-1 d-flex align-center justify-center py-3 px-0">
                        <PostMenu/>
                    </v-col>
                </v-row>
                <v-row class="post-image pa-0 mt-0">
                    <v-col class="col-12 py-0 mt-3" @dblclick="putLike">
                        <Picture
                            :image="postByID.image"
                            :ratio="16/9"
                            :type="'full-post'"
                        />
                    </v-col>
                    <v-btn class="like d-block d-md-none" @click="putLike()" fab small>
                        <v-badge v-if="postByID.likes" color="#39BEA1" :content="postByID.likes.length || '0'">
                            <v-icon>{{accountData && isLiked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                        </v-badge>
                    </v-btn>
                </v-row>
                <v-row class="py-0 px-3 px-sm-7">
                    <v-col class="col-12 col-md-11">
                        <h1 class="d-block d-sm-none">{{ postByID.title }}</h1>
                        <h2>{{ postByID.description }}</h2>
                        <span>{{ postByID.fullText }}</span>
                    </v-col>
                    <v-col class="col-1 d-none d-md-flex justify-center align-center">
                        <v-btn @click="putLike" fab>
                            <v-badge v-if="postByID.likes" color="#39BEA1" :content="postByID.likes.length || '0'">
                                <v-icon>{{accountData && isLiked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                            </v-badge>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <div class="comments px-0 py-3 py-sm-5 mt-3">
                <v-row class="py-0 px-3 px-sm-7">
                    <h2 class="pt-3 pb-0 px-3">Comment section: {{ comments.length }}</h2>
                    <CreateComment v-if="accountData"/>
                    <Comment v-for="comment in comments" :key="comment._id" :comment="comment"/>
                </v-row>
            </div>
        </div>
        <div v-else>
            <v-skeleton-loader 
                class="skeleton px-0 py-3 py-sm-5 mt-0"
                type="list-item-avatar-three-line, image, list-item-three-line"
            ></v-skeleton-loader>
            <div class="skeleton px-0 py-3 py-sm-5 mt-3">
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
        snackbar: false,
        // commentTree: []
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
                if(this.accountData) {
                    await this.likePost();
                    await this.getPostByID(this.$route.params.id);
                    this.isLiked = !this.isLiked;
                } else {
                    this.snackbar = true;
                }
                this.likeRequest = false;
            }
        },
        // getCommentsTree(comments) {
        //     var map = {}, node, roots = [], i;
            
        //     for (i = 0; i < comments.length; i += 1) {
        //         map[comments[i]._id] = i; // initialize the map
        //         comments[i].children = []; // initialize the children
        //     }
            
        //     for (i = 0; i < comments.length; i += 1) {
        //         node = comments[i];
        //         if (node.followedCommentID !== null) {
        //             comments[map[node.followedCommentID]].children.push(node);
        //         } else {
        //             roots.push(node);
        //         }
        //     }
        //     return roots;
        // }
        
    },
    async mounted() {
        this.updateFollowedComment({comment: null});
        await this.getPostByID(this.$route.params.id);
        if(this.isAuthenticated) {
            this.postByID.likes.forEach(like => {
                if(like == this.accountData._id) {
                    this.isLiked = true;
                }
            });
        }
        await this.getUserByID(this.postByID.postedBy);
        this.author = this.userByID;
        await this.getComments(this.postByID._id);

        // this.commentTree = this.comments;
        // console.log(this.getCommentsTree(this.commentTree));
    
        this.date = timeDifference(this.postByID.dateCreated); 
        this.contentLoaded = true
    },
}
</script>

<style lang="sass" scoped>
    a 
        text-decoration: none
        color: $font-dark
    
    .post, 
    .comments, 
    .skeleton 
        background: $main-white
        word-break: break-word
        @extend %card

    .post 
        h2 
            @media screen and (max-width: $xs-breakpoint) 
                font-size: 1rem
    
    .avatar
        width: auto
        @media screen and (max-width: $xs-breakpoint)
            width: 70px !important
    
        .v-image 
            width: 120px
            border-radius: 50%
    
    .post-head 
        h1 
            word-break: break-all
            @media screen and (max-width: $xs-breakpoint) 
                font-size: 1.3rem

        span
            @media screen and (max-width: $xs-breakpoint) 
                font-size: 0.8rem
    
    .post-image
        position: relative
    
    .like 
        position: absolute
        bottom: -5px
        right: 22px
    
    .skeleton 
        background: #fff
</style>