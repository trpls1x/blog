<template>
    <div class="comment">
        <p>{{userByID.name}}</p>
        <p>{{comment.text}}</p>
    </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'

export default {
    props: {
        comment: {
            type: Object
        }
    },
    computed: mapGetters(['userByID']),
    methods: {
        ...mapActions(['getUserByID'])
    },
    async mounted() {
        await this.getUserByID(this.comment.commentedBy)
    }
}
</script>