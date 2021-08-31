<template>
    <v-col class="col-12 comment">
        <v-row>
            <v-col class="col-2 avatar"><Avatar :avatar="userByID.avatar"/></v-col>
            <v-col class="col-9 d-flex flex-column justify-space-between">
                <div>
                    <h3>{{ userByID.name }}</h3>
                    <p>{{ comment.text }}</p>
                </div>
                <span>{{ date }}</span>
            </v-col>
            <v-col class="col-1 d-flex flex-column justify-center align-center">
                    <v-icon large>mdi-heart-outline</v-icon>
                    <span>{{ comment.likes.length }}</span>
                </v-col>
        </v-row>
    </v-col>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
import timeDifference from '@/services/timeDifference.service.js'
import Avatar from '@/components/Avatar'

export default {
    props: {
        comment: {
            type: Object
        }
    },
    components: {
        Avatar
    },
    data: () => ({
        date: null
    }),
    computed: mapGetters(['userByID']),
    methods: {
        ...mapActions(['getUserByID'])
    },
    async mounted() {
        this.date = timeDifference(this.comment.dateCreated);
        await this.getUserByID(this.comment.commentedBy)
    }
}
</script>

<style scoped>
    .avatar .v-image {
        border-radius: 50%;
    }
</style>