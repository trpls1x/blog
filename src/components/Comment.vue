<template>
    <v-col class="col-12 comment">
        <v-hover v-slot:default="{ hover }" :value="hover">
            <v-row>
                <v-col class="col-1 avatar"><Picture :image="author.avatar" :ratio="1" :type="'avatar'"/></v-col>
                <v-col class="col-9">
                    <div>
                        <h3 class="d-inline mr-2">{{ author.name }}</h3>
                        <span class="text--disabled">{{ date }}</span> <br>
                        <div v-if="followedComment" class="followedComment text--secondary">
                            <v-icon>mdi-share</v-icon>
                            <span class="font-weight-medium"> {{followedComment.author}}: </span>
                            <span>{{ followedComment.text }}</span>
                        </div>
                        <span>{{ comment.text }}</span>
                    </div>
                </v-col>
                <v-col class="col-2 d-flex justify-end align-center">
                    <v-btn 
                        icon
                        v-if="accountData" 
                        :class="hover ? 'd-inline' : 'd-none'" 
                        class="mr-3"
                        @click="reply()"><v-icon>mdi-reply</v-icon>
                    </v-btn>
                    
                    <v-badge :value="likeHover" color="#39BEA1" :content="likes">
                        <v-hover v-model="likeHover">
                            <v-icon @click="putLike()">{{isLiked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                        </v-hover>
                    </v-badge>
                </v-col>
            </v-row>
        </v-hover>
    </v-col>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import timeDifference from '@/services/timeDifference.service.js'
import Picture from '@/components/Picture'

export default {
    props: {
        comment: {
            type: Object
        },
        index: {
            type: Number
        }
    },
    components: {
        Picture
    },
    data: () => ({
        date: null,
        likes: 0,
        isLiked: false,
        likeHover: false,
        hover: false,
        author: {},
        followedComment: null
    }),
    computed: mapGetters(['userByID', 'isAuthenticated', 'accountData', 'comments']),
    methods: {
        ...mapActions(['getUserByID', 'likeComment']),
        ...mapMutations(['updateFollowedComment', 'addAuthor']),
        async putLike() {
            await this.likeComment(this.comment._id);
            this.isLiked = !this.isLiked;
            if(this.isLiked) {
                this.likes++
            } else {
                this.likes--
            }
        },
        reply() {
            this.updateFollowedComment({
                comment: this.comment,
                author: this.author.name
            })
        }
    },
    async mounted() {
        if(this.accountData) {
            this.comment.likes.forEach(element => {
                if(element == this.accountData._id) {
                    this.isLiked = true
                }
            });
        }
        this.likes = this.comment.likes.length;
        this.date = timeDifference(this.comment.dateCreated);

        await this.getUserByID(this.comment.commentedBy)
        this.author = this.userByID
        this.addAuthor({
            index: this.index,
            author: this.author.name
        })
        
        if(this.comment.followedCommentID) {
            this.followedComment = this.comments.filter(comment => comment._id == this.comment.followedCommentID)[0]
        }
    }
}
</script>

<style scoped>
    .avatar .v-image {
        border-radius: 50%;
    }
</style>