<template>
    <router-link :to="'/users/' + user._id" @click="pushUserID">
        <div class="user">
            <v-row>
                <v-col class="col-2 avatar">
                    <Picture :image="user.avatar" :ratio="1" :type="'avatar'"/>
                </v-col>
                <v-col class="col-7 d-flex flex-column justify-center">
                    <h3>{{ user.name }}</h3>
                    <span>{{ user.email }}</span>
                </v-col>
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
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 10px;
        transition: .1s ease-in-out;
    }
    .user:hover {
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 50%), 0px 5px 8px 0px rgb(0 0 0 / 34%), 0px 1px 14px 0px rgb(0 0 0 / 22%);
        transition: .2s ease-in-out;
    }
    .avatar .v-image{
        border-radius: 50%;
    }
</style>