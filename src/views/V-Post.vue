<template>
    <v-container>
        <div v-if="contentLoaded">
            <div class="post">
                <v-row>
                    <v-col class="col-2 col-lg-2 avatar">
                        <router-link :to="author._id ? '/users/' + author._id : '/deleted'" @click="pushUserID">
                            <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                        </router-link>
                    </v-col>
                    <v-col class="col-9 d-flex flex-column justify-center">
                        <h2><router-link :to="author._id ? '/users/' + author._id : '/deleted'" @click="pushUserID">{{ author.name }}</router-link></h2>
                        <h1>{{ postByID.title }}</h1>
                        <span class="text--secondary">{{ date }}</span>
                    </v-col>
                    <v-col v-if="accountData && author._id == accountData._id" class="col-1 d-flex justify-end">
                        <PostMenu/>
                    </v-col>
                </v-row>
                <v-row class="post-image">
                    <v-col class="col-12" >
                        <Picture
                            :image="postByID.image"
                            :ratio="16/9"
                            :type="'full-post'"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="col-11">
                        <h3>{{ postByID.description }}</h3>
                        <p>{{ postByID.fullText }}</p>
                    </v-col>
                    <v-col class="col-1 d-flex justify-center align-center">
                        <v-badge v-if="postByID.likes" :value="hover" color="#39BEA1" :content="postByID.likes.length || '0'">
                            <v-hover v-model="hover">
                                <v-icon @click="putLike" large>{{Liked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                            </v-hover>
                        </v-badge>
                    </v-col>
                </v-row>
            </div>

            <div class="comments">
                <v-row>
                    <v-col class="col-12"><h2>Comment section: {{ comments.length }}</h2></v-col>
                    <CreateComment v-if="accountData"/>
                    <Comment v-for="(comment, index) in comments" :key="comment._id" :comment="comment" :index="index"/>
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
    </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import timeDifference from '@/services/timeDifference.service.js'
import Picture from '@/components/Picture'
import PostMenu from '@/components/PostComponents/PostMenu'
import CreateComment from '@/components/CommentComponents/CreateComment'
import Comment from '@/components/Comment'

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
        Liked: false,
        hover: false,
        contentLoaded: false
    }),
    computed: mapGetters(['postByID', 'userByID', 'comments', 'isAuthenticated', 'accountData']),
    methods: {
        ...mapActions(['getPostByID', 'getUserByID', 'getComments', 'likePost']),
        ...mapMutations(['updateFollowedComment']),
        pushUserID() {
            this.$router.push({ name: 'user', params: { userID: this.author._id } }).catch(() => {});
        },
        async putLike() {
            await this.likePost();
            await this.getPostByID(this.$route.params.id)
            this.Liked = !this.Liked;
        }
    },
    async mounted() {
        this.updateFollowedComment({comment: null});
        await this.getPostByID(this.$route.params.id);
        if(this.isAuthenticated) {
            this.postByID.likes.forEach(element => {
                if(element == this.accountData._id) {
                    this.Liked = true;
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

<style scoped>
    a {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.87);;
    }
    .post, .comments, .skeleton {
        background: #f7f7f7;
        padding: 20px 0;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-top: 12px;
        word-break: break-word;
    }
    .row {
        padding: 0 30px;
    }
    .avatar .v-image {
        border-radius: 50%;
    }
    .post-image {
        padding: 0;
        margin-top: 0;
    }

    .skeleton {
        background: #fff;
    }
</style>