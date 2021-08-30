<template>
    <v-container>
        <div class="post">
            <v-row>
                <v-col class="col-2 avatar">
                    <Avatar :avatar="userByID.avatar"/>
                </v-col>
                <v-col class="col-10">
                    <h2>{{ userByID.name }}</h2>
                    <h1>{{ postByID.title }}</h1>
                    <p>{{ date }}</p>
                </v-col>
            </v-row>
            <v-row class="post-image">
                <v-col class="col-12" >
                    <v-img 
                        src="@/assets/post.jpg"
                        :aspect-ratio="fullPic ? 1 : 16/9"
                        @click="fullPic = !fullPic"
                    ></v-img>
                </v-col>
            </v-row>
            <v-row>
                <h3>{{postByID.description}}</h3>
                <p>{{postByID.fullText}}</p>
            </v-row>
        </div>

        <div class="comments">
            <Comment v-for="comment in comments" :key="comment._id" :comment="comment"/>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import timeDifference from '@/services/timeDifference.service.js'
import Avatar from '@/components/Avatar'
import Comment from '@/components/Comment'

export default {
    components: {
        Avatar,
        Comment
    },
    data: () => ({
        fullPic: false,
        date: ''
    }),
    computed: mapGetters(['postByID', 'userByID', 'comments']),
    methods: {
        ...mapActions(['getPostByID', 'getComments'])
    },
    async mounted() {
        await this.getPostByID(this.$route.params.id);
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
    }
</style>