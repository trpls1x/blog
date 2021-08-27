<template>
    <router-link :to="'../posts/' + post._id" @click.native="pushPostID(post._id)">
        <div class="post">
            <h3>asdasd</h3>
            <p>{{ post.description }}</p>
            <div class="d-flex justify-space-between"><span>{{post.dateCreated.split("T")[0]}}</span><span><v-icon>mdi-heart</v-icon> {{post.likes.length}}</span></div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    methods: {
        pushPostID(id) {
            this.$router.push({ name: 'post', params: { postID: id } }).catch(() => {});
        },
    }
}
</script>

<style scoped>
    .post {
        background: #f7f7f7;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 10px;
        transition: .1s ease-in-out;
    }
    .post:hover {
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 50%), 0px 5px 8px 0px rgb(0 0 0 / 34%), 0px 1px 14px 0px rgb(0 0 0 / 22%);
        transition: .2s ease-in-out;
    }
</style>