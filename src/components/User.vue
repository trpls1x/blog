<template>
    <router-link :to="'/users/' + user._id" @click="pushUserID">
        <div class="user pa-3 mb-3">
            <v-row>
                <v-col class="avatar col-3 col-sm-2 col-md-3 d-flex align-center">
                    <Picture :image="user.avatar" :ratio="1" :type="'avatar'"/>
                </v-col>
                <v-col class="text col-9 col-sm-10 col-md-9 d-flex flex-column justify-center">
                    <h3>{{ user.name || 'No name'}}</h3>
                    <span class="mail">{{ user.email }}</span>
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

<style lang="sass" scoped>
    .user
        background: $main-white
        transition: .1s ease-in-out
        @extend %card
    
        &:hover 
            box-shadow: $hover-shadow
            transition: .2s ease-in-out
    
    .avatar 
        @media screen and (max-width: $xs-breakpoint)
            width: 55px

        .v-image
            border-radius: 50%
    
    .mail 
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
</style>