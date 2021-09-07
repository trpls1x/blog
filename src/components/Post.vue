<template>
    <router-link :to="'../posts/' + post._id" @click="pushPostID(post._id)">
        <div v-if="contentLoaded" class="post">
            <v-row>
                <v-col class="col-1">
                    <v-avatar>
                        <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                    </v-avatar>
                </v-col>
                <v-col class="col-11 head">
                    <h4>{{author.name}}</h4>
                    <h3>{{post.title}}</h3>
                </v-col>
            </v-row>
            <v-row class="post-image">
                <v-col class="col-12">
                    <Picture :image="post.image" :ratio="16/7" :type="'post'"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="col-6 d-flex justify-start">
                    <span class="mr-3"><v-icon>mdi-heart-outline</v-icon> {{post.likes.length}} </span>
                    <span><v-icon>mdi-chat-outline</v-icon> {{commentsLength}}</span>
                </v-col>
                <v-col class="col-6 d-flex justify-end">{{date}}</v-col>
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
    computed: mapGetters(['userByID', 'comments', 'usersMap']),
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
    .head {
        padding-left:25px;
    }
    .post-image {
        padding: 0;
        margin-top: 0;
    }
    .v-icon {
        color: #000;
    }
    span {
        vertical-align: bottom;
    }
</style>