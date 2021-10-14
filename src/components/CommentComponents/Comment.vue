<template>
    <v-col :id="comment._id" class="col-12 mt-3">
        <v-hover v-slot:default="{ hover }" :value="hover">
            <v-row class="pl-3">
                <v-col class="avatar col-2 col-sm-1 d-none d-sm-block p-auto pa-0 pr-lg-3">
                    <router-link :to="'/users/' + author._id" @click="pushUserID">
                        <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                    </router-link>
                </v-col>

                <v-col class="comment-body col-12 col-sm-11 col-md-8 py-0 pl-0 pl-sm-3 pl-lg-0">
                    <h3 class="d-inline mr-2">
                        <router-link :to="'/users/' + author._id" @click="pushUserID">{{ author.name }}</router-link>
                    </h3>
                    <span class="text--disabled">{{ comment.dateCreated | luxonRelative }}</span> 
                    <br>
                    <div v-if="followedComment" class="followedComment text--secondary" @click="goToFollowed()">
                        <v-icon>mdi-share</v-icon>
                        <span class="font-weight-medium"> {{ followedComment.author }}: </span>
                        <span>{{ followedComment.text }}</span>
                    </div>
                    <span v-if="!editMode" class="comment-text">{{ comment.text }}</span>
                    <v-text-field v-else :label="comment.text" hide-details="auto" v-model="text">
                        <template v-slot:append-outer>
                            <v-btn icon @click="edit(); editMode = !editMode"><v-icon>mdi-check</v-icon></v-btn>
                            <v-btn icon @click="editMode = !editMode"><v-icon>mdi-close</v-icon></v-btn>
                        </template>  
                    </v-text-field>
                </v-col>
                
                <v-col class="col-12 col-md-3 d-flex justify-end align-center">
                    <div v-if="accountData" class="d-flex justify-end align-center">
                        <div v-if="author._id == accountData._id">
                            <v-btn 
                                icon
                                v-if="!editMode" 
                                :class="hover ? 'd-md-inline' : 'd-md-none'" 
                                class="mr-3 d-inline"
                                @click="changeMode()"><v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                            <v-dialog v-else max-width="400">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-bind="attrs" 
                                        v-on="on"
                                        icon
                                        :class="hover ? 'd-md-inline' : 'd-md-none'" 
                                        class="mr-3 d-inline"
                                    ><v-icon small>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="#b70000" dark>Delete comment</v-toolbar>
                                        <div class="text d-flex justify-center pa-4">
                                            <span class="text-center">Are you sure want to delete this comment?</span>
                                        </div>
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
                            :class="hover ? 'd-md-inline' : 'd-md-none'" 
                            class="mr-3 d-inline"
                            @click="reply()"><v-icon>mdi-reply</v-icon>
                        </v-btn>
                    </div>
                                        
                    <v-badge color="#39BEA1" :content="likes || '0'" class="mr-3">
                        <v-icon @click="putLike()">{{ accountData && isLiked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                    </v-badge>
                </v-col>
            </v-row>
        </v-hover>
        <hr class="d-md-none">
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
                color="$main-white"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-col>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Picture from '@/components/Picture'

export default {
    name: 'Comment',
    props: {
        comment: {
            type: Object
        }
    },
    components: {
        Picture
    },
    data: () => ({
        author: {},
        text: '',
        likes: 0,
        isLiked: false,
        hover: true,
        editMode: false,
        followedComment: null,
        likeRequest: false,
        snackbar: false
    }),
    computed: mapGetters(['userByID', 'accountData', 'comments']),
    async mounted() {
        if(this.accountData)
            this.isLiked = this.comment.likes.includes(this.accountData._id);
        this.likes = this.comment.likes.length;
        await this.getUserByID(this.comment.commentedBy);
        this.author = this.userByID;
        if(this.comment.followedCommentID) {
            try {
                this.followedComment = this.comments.find(comment => comment._id === this.comment.followedCommentID);
                await this.getUserByID(this.followedComment.commentedBy);
                this.followedComment.author = this.userByID.name;
            } catch {
                return;
            }
        }
        this.hover = false;
    },
    methods: {
        ...mapActions(['getUserByID', 'likeComment', 'editComment', 'deleteComment']),
        ...mapMutations(['updateFollowedComment']),
        async putLike() {
            if(!this.likeRequest) {
                this.likeRequest = true;
                if(this.accountData) {
                    await this.likeComment(this.comment._id);
                    this.isLiked ? this.likes-- : this.likes++;
                    this.isLiked = !this.isLiked;
                } else {
                    this.snackbar = true;
                }
                this.likeRequest = false;
            }
        },
        changeMode() {
            this.text = this.comment.text;
            this.editMode = !this.editMode;
        },
        async edit() {
            if(this.comment.text != this.text) {
                await this.editComment({
                    commentID: this.comment._id,
                    comment: {
                        text: this.text
                    }
                });
            }
        },
        reply() {
            const createForm = document.getElementById("createComment");
            createForm.scrollIntoView({block: "center", behavior: "smooth"});
            this.updateFollowedComment({
                comment: this.comment,
                author: this.author.name
            });
        },
        goToFollowed() {
            let followedComment = document.getElementById(this.comment.followedCommentID);
            followedComment.scrollIntoView({block: "center", behavior: "smooth"});
            followedComment.style.backgroundColor = "#E7E7E7";
            followedComment.style.transition = "0.5s";
            setTimeout(() => followedComment.style.backgroundColor = '#F7F7F7', 1000);
        },
        pushUserID() {
            this.$router.push({ name: 'user', params: { userID: this.author._id } }).catch(() => {});
        }
    }
}
</script>

<style lang="sass" scoped>
    a
        text-decoration: none
        color: $font-dark
    
    .avatar 
        width: 55px
        
        .v-image 
            border-radius: 50%
    
    .text 
        width: 100%
    
    .followedComment 
        width: 100%
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
        cursor: pointer
    
    .comment-text 
        word-break: break-word
</style>