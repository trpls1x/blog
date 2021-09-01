<template>
    <v-container>
        <div class="post">
            <v-row>
                <v-col class="col-2 col-lg-2 avatar">
                    <Picture :image="author.avatar" :ratio="1" :type="'avatar'"/>
                </v-col>
                <v-col class="col-10">
                    <h2>{{ author.name }}</h2>
                    <h1>{{ postByID.title }}</h1>
                    <p>{{ date }}</p>
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
                <v-col class="col-1 d-flex flex-column justify-center align-center">
                    <v-icon x-large>mdi-heart-outline</v-icon>
                    <span>{{ postByID.likes.length }}</span>
                </v-col>
            </v-row>
        </div>

        <div class="comments">
            <v-row>
                <v-col class="col-12"><h2>Comment section: {{ comments.length }}</h2></v-col>
                <Comment v-for="comment in comments" :key="comment._id" :comment="comment"/>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import timeDifference from '@/services/timeDifference.service.js'
import Picture from '@/components/Picture'
import Comment from '@/components/Comment'

export default {
    components: {
        Picture,
        Comment
    },
    data: () => ({
        author: {},
        date: '',
    }),
    computed: mapGetters(['postByID', 'userByID', 'comments']),
    methods: {
        ...mapActions(['getPostByID', 'getUserByID', 'getComments'])
    },
    async mounted() {
        await this.getPostByID(this.$route.params.id);
        await this.getUserByID(this.postByID.postedBy);
        this.author = this.userByID;
        await this.getComments(this.postByID._id);
        this.date = timeDifference(this.postByID.dateCreated); 
    }
}
</script>

<style scoped>
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