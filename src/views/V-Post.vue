<template>
    <v-container>
        <div class="post">
            <v-row>
                <v-col class="col-2 col-lg-2 avatar">
                    <router-link :to="'/users/' + author._id" @click="pushUserID">
                        <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                    </router-link>
                </v-col>
                <v-col class="col-9">
                    <h2><router-link :to="'/users/' + author._id" @click="pushUserID">{{ author.name }}</router-link></h2>
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
                    <v-badge :value="hover" color="#39BEA1" :content="postByID.likes && postByID.likes.length">
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
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    }),
    computed: mapGetters(['postByID', 'userByID', 'comments', 'isLiked', 'isAuthenticated', 'accountData']),
    methods: {
        ...mapActions(['getPostByID', 'getUserByID', 'getComments', 'likePost']),
        pushUserID() {
            this.$router.push({ name: 'user', params: { userID: this.author._id } }).catch(() => {});
        },
        async putLike() {
            await this.likePost();
            await this.getPostByID(this.$route.params.id)
            this.Liked = this.isLiked;
        }
    },
    async mounted() {
        await this.getPostByID(this.$route.params.id);
        this.Liked = this.isLiked;
        await this.getUserByID(this.postByID.postedBy);
        this.author = this.userByID;
        await this.getComments(this.postByID._id);
        this.date = timeDifference(this.postByID.dateCreated); 
    },
}
</script>

<style scoped>
    a {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.87);;
    }
    .post, .comments {
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
</style>