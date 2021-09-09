<template>
    <router-link :to="'/users/' + user._id" @click="pushUserID">
        <div class="user">
            <v-row>
                <div class="avatar mr-3">
                    <Picture :image="user.avatar" :ratio="1" :type="'avatar'"/>
                </div>
                <div class="d-flex flex-column justify-center">
                    <h3>{{ user.name }}</h3>
                    <span class="mail">{{ user.email }}</span>
                </div>
            </v-row>
        </div>
    </router-link>
</template>

<script>
import Picture from '@/components/Picture'

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    components: {
        Picture
    },
    methods: {
        pushUserID() {
            this.$router.push({ name: 'user', params: { userID: this.user._id } }).catch(() => {});
        },
    }
}
</script>

<style scoped>
    .user {
        background: #f7f7f7;
        padding: 30px 30px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 10px;
        transition: .1s ease-in-out;
    }
    .user:hover {
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 50%), 0px 5px 8px 0px rgb(0 0 0 / 34%), 0px 1px 14px 0px rgb(0 0 0 / 22%);
        transition: .2s ease-in-out;
    }
    .avatar {
        width: 80px;
    }
    .avatar .v-image{
        border-radius: 50%;
    }

    @media only screen and (max-width: 959px){
        .avatar {
            width: 55px;
        }
    }
</style>