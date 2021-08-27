<template>
    <v-container>
        <v-row class="post">
            <v-col class="col-2 avatar">
                <v-avatar>
                    <Avatar :avatar="userByID.avatar"/>
                </v-avatar>
            </v-col>
            <v-col class="col-10">
                <div>
                    <h1>{{userByID.name}}</h1>
                    <h3>{{postByID.title}}</h3>
                    <h4>{{postByID.description}}</h4>
                    <hr>
                    <p class="text-justify">{{postByID.fullText}}</p>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Avatar from '@/components/Avatar'

export default {
    components: {
        Avatar
    },
    computed: mapGetters(['postByID', 'userByID']),
    methods: {
        ...mapActions(['getPostByID'])
    },
    async mounted() {
        await this.getPostByID(this.$route.params.id)
    }
}
</script>

<style scoped>
    .post {
        background: #f7f7f7;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-top: 12px;
        word-break: break-word;
    }
    .v-avatar {
        width: 100% !important;
        height: 100% !important;
    }
</style>