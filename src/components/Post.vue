<template>
    <router-link :to="'../posts/' + post._id" @click.native="pushPostID(post._id)">
        <div class="post">
            <v-row>
                <v-col class="col-1">
                    <v-avatar>
                        <Avatar/>
                    </v-avatar>
                </v-col>
                <v-col class="col-11 head">
                    <h4>{{author.name}}</h4>
                    <h3>{{post.title}}</h3>
                </v-col>
            </v-row>
            <v-row class="post-image">
                <v-col class="col-12">
                    <v-img :aspect-ratio="16/7" src="@/assets/post1.jpg"></v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="col-6 d-flex justify-start">
                    <span class="mr-3"><v-icon>mdi-heart-outline</v-icon> {{post.likes.length}} </span>
                    <span><v-icon>mdi-chat-outline</v-icon> {{dataComments.length}}</span>
                </v-col>
                <v-col class="col-6 d-flex justify-end">{{date}}</v-col>
            </v-row>
        </div>
    </router-link>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import timeDifference from '@/services/timeDifference.service.js'
import Avatar from '@/components/Avatar'

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    components: {
        Avatar
    },
    data: () => ({
        date: null,
        author: {
            name: ''
        },
        dataComments: []
    }),
    computed: mapGetters(['userByID', 'comments']),
    methods: {
        ...mapActions(['getUserByID', 'getComments']),
        pushPostID(id) {
            this.$router.push({ name: 'post', params: { postID: id } }).catch(() => {});
        },
    },
    async mounted () {
        this.date = timeDifference(this.post.dateCreated);
        try { 
            await this.getUserByID(this.post.postedBy) 
            this.author = this.userByID;
        } catch(e) {
            console.log(e);
        }
        await this.getComments(this.post._id);
        this.dataComments = this.comments
    }
}
</script>

<style scoped>
    .post {
        background: #f7f7f7;
        padding: 20px 0;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 15px;
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