<template>
    <v-container>
        <div v-if="contentLoaded">
            <div class="post">
                <v-row>
                    <div class="avatar">
                        <router-link :to="author._id ? '/users/' + author._id : '/deleted'" @click="pushUserID">
                            <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                        </router-link>
                    </div>
                    <div class="post-head d-flex flex-column justify-center">
                        <div class="d-flex flex-column flex-md-row align-start align-md-center">
                            <h2 class="mr-3"><router-link :to="author._id ? '/users/' + author._id : '/deleted'" @click="pushUserID">{{ author.name }}</router-link></h2>
                            <span class="text--disabled">{{ date }}</span>
                        </div>
                        <h1 class="d-none d-md-block">{{ postByID.title }}</h1>
                    </div>
                    <div v-if="accountData && author._id == accountData._id" class="ml-auto d-flex align-center justify-end dots">
                        <PostMenu/>
                    </div>
                    <div v-else class="ml-auto"></div>
                </v-row>
                <v-row class="post-image">
                    <v-col class="col-12" >
                        <Picture
                            :image="postByID.image"
                            :ratio="16/9"
                            :type="'full-post'"
                        />
                    </v-col>
                    <v-btn class="like d-block d-md-none" @click="putLike" fab small>
                        <v-badge v-if="postByID.likes" color="#39BEA1" :content="postByID.likes.length || '0'">
                            <v-icon>{{Liked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                        </v-badge>
                    </v-btn>
                </v-row>
                <v-row>
                    <v-col class="col-12 col-md-11">
                        <h1 class="d-block d-md-none">{{ postByID.title }}</h1>
                        <h2>{{ postByID.description }}</h2>
                        <span>{{ postByID.fullText }}</span>
                    </v-col>
                    <v-col class="col-1 d-none d-md-flex justify-center align-center ">
                        <v-hover v-model="hover">
                            <v-btn @click="putLike" fab>
                                <v-badge v-if="postByID.likes" :value="hover" color="#39BEA1" :content="postByID.likes.length || '0'">
                                    <v-icon>{{Liked ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                                </v-badge>
                            </v-btn>
                        </v-hover>
                    </v-col>
                </v-row>
            </div>

            <div class="comments">
                <v-row>
                    <h2>Comment section: {{ comments.length }}</h2>
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
    .row {
        padding: 0 30px;
    }
    a {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.87);;
    }
    .post, .comments, .skeleton {
        background: #f7f7f7;
        padding: 20px 0;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        word-break: break-word;
    }
    .comments, .skeleton {
        margin-top: 12px;
    }
    h1 {
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
    }
    .comments h2 {
        padding: 12px 12px 0;
    }
    .skeleton:first-child {
        margin-top: 0;
    }
    .avatar {
        padding: 12px;
        width: 120px;
    }
    .avatar .v-image {
        border-radius: 50%;
    }
    .post-head {
        padding: 12px;
    }
    .post-image {
        padding: 0;
        margin-top: 0;
        position: relative;
    }
    .like {
        position: absolute;
        bottom: -5px;
        right: 22px
    }
    .dots {
        padding: 12px 0;
    }
    .skeleton {
        background: #fff;
    }

    @media screen and (max-width: 959px) {
        .avatar {
            width: 70px;
        }
        .row {
            padding: 0 12px;
        }
        .post, .comments, .skeleton {
            padding: 12px 0;
        }
        .post-image {
            padding: 0;
            margin-top: 0;
        }
        .post-image .col {
            padding-bottom: 0;
        }
        h1 {
            font-size: 1.3rem;
        }
        h2 {
            font-size: 1rem;
        }
        .post-head span {
            font-size: .8rem;
        }
        .post-head {
            padding: 12px 0;
        }
    }
</style>