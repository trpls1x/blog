<template>
    <v-col class="col-12 comment">
        <v-hover v-slot:default="{ hover }" :value="hover">
            <v-row>
                <v-col class="col-1 avatar">
                    <router-link :to="'/users/' + author._id" @click="pushUserID">
                        <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                    </router-link>
                </v-col>
                <v-col class="col-9">
                    <div>
                        <h3 class="d-inline mr-2">
                            <router-link :to="'/users/' + author._id" @click="pushUserID">{{ author.name }}</router-link>
                        </h3>
                        <span class="text--disabled">{{ date }}</span> <br>
                        <div v-if="followedComment" class="followedComment text--secondary">
                            <v-icon>mdi-share</v-icon>
                            <span class="font-weight-medium"> {{followedComment.author}}: </span>
                            <span>{{ followedComment.text }}</span>
                        </div>
                        <span v-if="!editMode">{{ comment.text }}</span>
                        <v-text-field v-else :label="comment.text" hide-details="auto" v-model="text">
                            <template v-slot:append-outer>
                                <v-btn icon @click="edit(); editMode = !editMode"><v-icon>mdi-check</v-icon></v-btn>
                                <v-btn icon @click="editMode = !editMode"><v-icon>mdi-close</v-icon></v-btn>
                            </template>  
                        </v-text-field>
                    </div>
                </v-col>
                <v-col class="col-2 d-flex justify-end align-center">
                    <div v-if="accountData" class="d-flex justify-end align-center">
                        <div v-if="author._id == accountData._id">
                            <v-btn 
                                icon
                                v-if="!editMode" 
                                :class="hover ? 'd-inline' : 'd-none'" 
                                class="mr-3"
                                @click="changeMode()"><v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                            <v-dialog v-else max-width="400">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-bind="attrs" 
                                        v-on="on"
                                        icon
                                        :class="hover ? 'd-inline' : 'd-none'" 
                                        class="mr-3"
                                    ><v-icon small>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="#b70000" dark>Delete comment</v-toolbar>
                                        <div class="text d-flex justify-center"><span class="text-center">Are you sure want to delete this comment?</span></div>
                                        <v-card-actions class="justify-end">
                                            <v-btn color="#b70000" text @click="deleteComment(comment._id); dialog.value = false">Delete</v-btn>
                                            <v-btn text @click="dialog.value = false">Cancel</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>              
                        </div>
                        <v-btn 
                            icon
                            :class="hover ? 'd-inline' : 'd-none'" 
                            class="mr-3"
                            @click="reply()"><v-icon>mdi-reply</v-icon>
                        </v-btn>
                    </div>
                                    
                    <v-badge :value="likeHover" color="#39BEA1" :content="likes || '0'">
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
        text: '',
        likes: 0,
        isLiked: false,
        likeHover: false,
        hover: false,
        editMode: false,
        author: {},
        followedComment: null
    }),
    computed: mapGetters(['userByID', 'isAuthenticated', 'accountData', 'comments']),
    methods: {
        ...mapActions(['getUserByID', 'likeComment', 'editComment', 'deleteComment']),
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
        changeMode() {
            this.text = this.comment.text
            this.editMode = !this.editMode
        },
        async edit() {
            if(this.comment.text != this.text) {
                await this.editComment({
                    commentID: this.comment._id,
                    comment: {
                        text: this.text
                    }
                })
            }
        },
        reply() {
            this.updateFollowedComment({
                comment: this.comment,
                author: this.author.name
            })
        },
        pushUserID() {
            this.$router.push({ name: 'user', params: { userID: this.author._id } }).catch(() => {});
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
            author: this.author.name || 'DELETED'
        })
        
        if(this.comment.followedCommentID) {
            this.followedComment = this.comments.filter(comment => comment._id == this.comment.followedCommentID)[0]
        }
    }
}
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #000;
    }
    .avatar .v-image {
        border-radius: 50%;
    }
    .text {
        width: 100%;
        padding: 15px;
    }
</style>