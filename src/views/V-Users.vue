<template>
    <v-container>
        <v-row>
            <v-col class="users col-9">
                <User v-for="user in users" :key="user._id" :user="user"/>
            </v-col>
            <v-col class="nav col-3">
                <Navigation />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import User from '@/components/User'
import Navigation from '@/components/Navigation'

export default {
    name: "feed",
    components: {
        User,
        Navigation
    },
    computed: mapGetters(['users']),
    methods: {
        ...mapActions(['fetchUsers'])
    },
    mounted() {
        this.fetchUsers();
    }
}
</script>

<style scoped>
    .users a {
        color: #000;
        text-decoration: none;
    }
</style>