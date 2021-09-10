<template>
    <router-link :to="'../posts/' + post._id" @click="pushPostID(post._id)">
        <div v-if="contentLoaded" class="post">
            <v-row class="d-flex align-center">
                <div class="avatar">
                    <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                </div>
                <div class="head d-flex flex-column justify-center align-start">
                    <h4>{{author.name || 'No name'}}</h4>
                    <span class="text--disabled">{{ date }}</span>
                </div>
            </v-row>
            <v-row class="post-image">
                <v-col class="col-12">
                    <Picture :image="post.image" :ratio="16/7" :type="'post'"/>
                </v-col>
            </v-row>
            <v-row>
                <div class="bottom d-flex justify-space-between">
                    <div class="text"><span>{{post.title}}</span></div>
                    <div class="d-flex">
                        <div class="d-flex align-center mr-2">
                            <v-icon class="mr-1">mdi-heart-outline</v-icon><span>{{post.likes.length}}</span>
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
            class="skeleton"
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
    }),
    computed: mapGetters(['userByID', 'comments']),
    methods: {
        ...mapActions(['getUserByID', 'getComments']),
        pushPostID(id) {
            this.$router.push({ name: 'post', params: { postID: id } }).catch(() => {});
        },
    },
    async mounted() {
        this.date = timeDifference(this.post.dateCreated);
        // if(this.usersMap[this.post.postedBy]) { 
        //     console.log('from map');
        //     this.author = this.usersMap[this.post.postedBy];
        // } else {
        //     console.log('from request');
            await this.getUserByID(this.post.postedBy);
            this.author = this.userByID;
        // }
        await this.getComments(this.post._id);
        this.commentsLength = this.comments.length

        this.contentLoaded = true
    }
}
</script>

<style scoped>
    .post, .skeleton {
        background: #fff;
        padding: 20px 0;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 15px;
    }
    .post {
        background: #f7f7f7;
        transition: .1s ease-in-out;
    }
    .post:hover {
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 50%), 0px 5px 8px 0px rgb(0 0 0 / 34%), 0px 1px 14px 0px rgb(0 0 0 / 22%);
        transition: .2s ease-in-out;
    }
    .row {
        padding: 0 20px;
    }
    .avatar {
        padding: 12px;
        width: 80px;
    }
    .avatar .v-image {
        border-radius: 50%;
    }
    .text {
        font-size: 1.2rem;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
    }
    .post-image {
        padding: 0;
        margin-top: 0;
    }
    .v-icon {
        color: rgba(0, 0, 0, 0.87);
    }
    .bottom {
        width: 100%;
        padding: 12px;
    }

    @media screen and (max-width: 599px) {
        .row {
            padding: 0 12px;
        }
        .post-image {
            padding: 0;
            margin-top: 0;
        }
        .post-image > .col-12 {
            padding-bottom: 0;
        }
        .avatar {
            width: 70px;
        }
        h4 {
            font-size: .9rem;
        }
        .head span {
            font-size: .8rem;
        }
        .post {
            padding: 12px 0;
        }
        .skeleton {
            padding: 0 0;
        }
    }
</style>