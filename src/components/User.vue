<template>
    <router-link :to="'../users/' + user._id" @click.native="pushUserID(user._id)">
        <v-row class="user" >
            <v-col class="col-3 avatar d-flex justify-center align-center">
                <v-avatar>
                    <Avatar :avatar="user.avatar"/>
                </v-avatar>
            </v-col>
            <v-col class="col-8">
                <h3>{{ user.name }}</h3>
                <span>{{ user.email }}</span>
            </v-col>
        </v-row>
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
        margin-bottom: 12px;
        border-radius: 15px;
        transition: .1s ease-in-out;
    }
    .user:hover {
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        transition: .2s ease-in-out;
    }
    .user *{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>