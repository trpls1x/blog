<template>
    <v-col class="col-12 comment">
        <v-row>
            <v-col class="col-2 avatar"><Picture :image="author.avatar" :type="'avatar'"/></v-col>
            <v-col class="col-9 d-flex flex-column justify-space-between">
                <div>
                    <h3>{{ author.name }}</h3>
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
import Picture from '@/components/Picture'

export default {
    props: {
        comment: {
            type: Object
        }
    },
    components: {
        Picture
    },
    data: () => ({
        date: null,
        author: {}
    }),
    computed: mapGetters(['userByID']),
    methods: {
        ...mapActions(['getUserByID'])
    },
    async mounted() {
        this.date = timeDifference(this.comment.dateCreated);
        await this.getUserByID(this.comment.commentedBy)
        this.author = this.userByID
    }
}
</script>

<style scoped>
    .avatar .v-image {
        border-radius: 50%;
    }
</style>