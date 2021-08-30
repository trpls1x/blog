<template>
    <router-link :to="'../users/' + user._id" @click.native="pushUserID(user._id)">
        <div class="user d-flex">
            <v-col class="col-2 avatar d-flex justify-center align-center">
                <v-avatar>
                    <Avatar :avatar="user.avatar"/>
                </v-avatar>
            </v-col>
            <v-col>
                <h3>{{ user.name }}</h3>
                <span>{{ user.email }}</span>
            </v-col>
        </div>
    </router-link>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    components: {
        Avatar
    },
    methods: {
        pushUserID(id) {
            this.$router.push({ name: 'user', params: { userID: id } }).catch(() => {});
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
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        transition: .2s ease-in-out;
    }
</style>